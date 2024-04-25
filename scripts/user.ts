import inquirer from 'inquirer'
import { logger } from './winston-config';
import { getDatabase } from './database';
import { isEmpty } from 'lodash';
import { hash } from 'bcrypt';
import { config } from './convict-config';
import moment from 'moment';
import { UserCategory } from 'modules/users';
import { errorMsg } from 'common/utils';

(async () => {
    const db = await getDatabase();

    const qestions = [
        { type: 'input', name: 'email', message: 'The email of the user?' },
        { type: 'input', name: 'username', message: 'The name of the user?' },
        { type: 'input', name: 'fname', message: 'The password of the user?' },
        { type: 'input', name: 'lname', message: 'The password of the user?' },
        { type: 'input', name: 'clearPassword', message: 'The password of the user?' },
        { type: 'input', name: 'clearPassword', message: 'The password of the user?' },
    ]
    try {
        const answers = await inquirer.prompt(qestions);
        const { email, clearPassword } = answers;
        const existing = db.collection('users').findOne({ email });

        if (!isEmpty(existing)) {
            logger.error('Email allready used');
            return new Error(errorMsg.EMAIL_USED);
        }
        const password = await hash(clearPassword, config.get('saltRounds'));
        delete answers.clearPassword;
        const user = { ...answers, password, dates: { created: moment().valueOf() }, category: UserCategory.ADMIN }
        const result = await db.collection('users').insertOne(user);

        if (result instanceof Error) { return result; }

        console.log(`User ${name} created successfully`)
    } catch (error: any) {
        console.log(error)
    } finally {
        process.exit();
    }


})()