import Joi, { ValidationResult } from 'joi';
import { Credentials } from '../models';
import { User } from 'modules/users';

export const validateLogin = (credentials: Credentials): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).message('enter a correct email please'),
        password: Joi.string().required()
    });

    return schema.validate(credentials)
};

export const validateRegister = (user: User): ValidationResult => {
    const studentProfile = Joi.object({
        level: Joi.string().required(),
        school: Joi.string().required(),
        field: Joi.string().required(),
        year: Joi.string().regex(/(?:(?:18|19|20|21)[0-9]{2})/).message('Please enter a valid year').required(),
    });

    const schema = Joi.object({
        username: Joi.string().required(),
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).message('enter a correct email please'),
        password: Joi.string().required(),
        studentProfile: studentProfile.required()
    });
    return schema.validate(user);
};