import { isEmpty } from "lodash";
import { User, UserCategory } from "./models";
import { UsersRepository } from "./users.repository";
import { BaseService, errorMsg } from "common";
import { Service } from "typedi";
import { hash } from "bcrypt";
import { config } from "convict-config"
import moment from "moment";


@Service()
export class UsersService extends BaseService<User> {

    constructor(private readonly userRepository: UsersRepository) {
        super(userRepository);
    }

    async getUserById(filter: any) {
        try { return await this.userRepository.getUserById(filter.id); }
        catch (error) { throw (error); }
    }


    async createUser(user: User) {
        try {
            const { email, username } = user;

            delete user._id;
            const existing = await this.userRepository.findOne({ filter: { email } });

            if (!isEmpty(existing)) { throw new Error(errorMsg.EMAIL_USED); }

            const existingUsername = await this.userRepository.findOne({ filter: { username } });

            if (!isEmpty(existingUsername)) { throw new Error(errorMsg.USERNAME_USED); }

            const password = '123';

            user.password = await hash(password, config.get('saltRounds'));

            user.category = UserCategory.ADMIN;
            
            user.dates = { created: moment().valueOf() };

            const result = await this.userRepository.create(user as any);

            const data = { _id: result.insertedId };

            return data;
        }
        catch (error) { throw (error); }
    }

}
