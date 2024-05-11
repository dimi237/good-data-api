import { hash } from 'bcrypt';
import { getDatabase } from './database';
import { isEmpty } from 'lodash';
import moment from 'moment';
import config from './convict-config';

(async () => {
	const db = await getDatabase();
	const users = [
		{ 
		username: "ADMIN001",
		fname: "Gerbauld",
		lname: "Tango",
		email: "tangogerbauld@gmail.com",
		tel: "237690364920",
		password: await hash('goodData2024', config.get('saltRounds')),
		category: 100,
		enabled: true, 
		dates: { created: moment().valueOf(), updated: null } 
	},
	]
	try {
	  

		if (isEmpty(users)) { return; }

		const result = await db.collection('users').insertMany(users);

		if (result instanceof Error) { return result; }

		console.log(`users created successfully`)
	} catch (error: any) {
		console.log(error)
	} finally {
		process.exit();
	}


})()