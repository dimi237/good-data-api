import Joi, { ValidationResult } from 'joi';
import { Credentials } from '../models';
import { User } from 'modules/users';

export const validateLogin = (credentials: Credentials): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/)).message('enter a correct email please'),
        password: Joi.string().required()
    });

    return schema.validate(credentials)
};

export const validateRegister = (user: User): ValidationResult => {
    const profile = Joi.object({
        profession: Joi.string().required(),
        field: Joi.string().required(),
    });

    const schema = Joi.object({
        username: Joi.string().required(),
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/)).message('enter a correct email please'),
        password: Joi.string().required(),
        profile: profile.required()
    });
    return schema.validate(user);
};