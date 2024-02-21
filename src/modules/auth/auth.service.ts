import { User, UserCategory, UsersService } from "../users";
import { Service } from "typedi";
import { Credentials } from "./models/credentials.model"
import { sign, verify } from 'jsonwebtoken';
import * as helper from "./helpers"
import bcrypt from 'bcrypt';
import { config } from 'convict-config';
import { errorMsg } from "common/utils";
import { isEmpty } from "lodash";



@Service()
export class AuthService {

    constructor(private readonly userService: UsersService) { }

    async login(credentials: Credentials): Promise<any> {
        try {
            const { email, password } = credentials;

            const user = await this.userService.findOne({ filter: { email } });
            if (user instanceof Error) { return user; }
            if (isEmpty(user)) { throw new Error(errorMsg.BAD_CREDENTIAL); }

            const pwdOk = await bcrypt.compare(password, user.password);
            if (!pwdOk) { throw new Error(errorMsg.BAD_CREDENTIAL); }

            const { username } = user;
            const tokenData = { _id: user._id.toString(), email, username };
            const token = helper.create(tokenData);
            return { token };
        } catch (error: any) {
            throw (error);
        }
    }

    async register(user: User): Promise<any> {
        try {
            const { fname, lname, username, email, password, studentProfile } = user;
            const createdUser = new User(fname, lname, username, email, password, UserCategory.STUDENT, studentProfile);
            const savedUser = await this.userService.createUser(createdUser);
            return savedUser;
        } catch (error: any) {
            throw (error);
        }
    }

    async refresh(refreshToken: any) {
        try {

            const payload = verify(refreshToken, config.get('tokenSalt'));
            const access_token = sign(payload, config.get('tokenSalt'), { expiresIn: config.get('tokenTTL') });
            const refresh_token = sign(payload, config.get('tokenSalt'), { noTimestamp: true });
            return { access_token, refresh_token, type: 'Bearer' }
        } catch (error: any) {
            throw (error);
        }
    }

}
