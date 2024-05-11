import { User, UserCategory, UsersService } from "../users";
import { Service } from "typedi";
import { Credentials } from "./models/credentials.model"
import { verify } from 'jsonwebtoken';
import * as helper from "./helpers"
import bcrypt, { hash } from 'bcrypt';
import { config } from 'convict-config';
import { errorMsg } from "common/utils";
import { isEmpty } from "lodash";
import moment from "moment";
import { NotificationsService, TemplateLabel } from "modules/notifications";



@Service()
export class AuthService {

    constructor(private readonly userService: UsersService,
        private notificationsService: NotificationsService
    ) { }

    async login(credentials: Credentials, metadata: any): Promise<any> {
        try {
            const { email, password } = credentials;
            const { ip, location } = metadata;

            const user = await this.userService.findOne({ filter: { email } });
            if (user instanceof Error) { return user; }
            if (isEmpty(user)) { throw new Error(errorMsg.BAD_CREDENTIAL); }

            if (!user.enabled) { throw new Error(errorMsg.USER_DISBALED); }

            const pwdOk = await bcrypt.compare(password, user?.password);
            if (!pwdOk) { throw new Error(errorMsg.BAD_CREDENTIAL); }
            const { username, tel, fname, lname, category } = user;
            const tokenData = { _id: user._id.toString(), email, username, tel, fname, lname, category };
            const token = helper.create(tokenData);
            await this.userService.update({ username }, { token: { accessToken: token.access_token, refreshToken: token.refresh_token, expiresIn: token.expires_in } }, { connectionHistory: { date: moment().valueOf(), ip, location } });
            return { user, token };
        } catch (error: any) {
            throw (error);
        }
    }

    async register(user: User): Promise<any> {
        try {
            const { fname, lname, username, email, tel, password, profile } = user;
            const hashedPassword = await hash(password, config.get('saltRounds'));
            const createdUser = new User(fname, lname, username, email, tel, hashedPassword, UserCategory.USER, profile);
            const existing = await this.userService.findOne({ filter: { email } });

            if (!isEmpty(existing)) { throw new Error(errorMsg.EMAIL_USED); }

            const existingUsername = await this.userService.findOne({ filter: { username } });

            if (!isEmpty(existingUsername)) { throw new Error(errorMsg.USERNAME_USED); }

            const savedUser = await this.userService.create(createdUser);
            await this.notificationsService.sendEmailNotification(email, TemplateLabel.INSCRIPTION_TO_USER,user);
            return savedUser;
        } catch (error: any) {
            throw (error);
        }
    }

    async refresh(data: any) {
        try {
            const { refreshToken } = data;
            const payloadata: any = verify(refreshToken, `${config.get('tokenSalt')}`);

            if (moment().valueOf() > payloadata.exp) { throw new Error(errorMsg.EXPIRE_TIME); }

            delete payloadata.payload.rand;
            const payload = payloadata.payload;
            const { _id } = payload;
            const user = await this.userService.findById(_id);

            if (!user) { throw new Error(errorMsg.NO_ACCOUNT); }

            const { token } = user;

            if (!token || token.refreshToken !== refreshToken) { throw new Error(errorMsg.INVALID_TOKEN); }

            const tokenData = helper.create(payload);

            await this.userService.update({ _id }, { token: { accessToken: tokenData.access_token, refreshToken: tokenData.refresh_token, expiresIn: tokenData.expires_in } });

            return { token: tokenData };

        } catch (error: any) {
            throw (error);
        }
    }

}
