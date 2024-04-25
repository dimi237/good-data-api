import Joi, { ValidationResult } from 'joi';
import { User } from '../models';

export const validateCreateUser = (user: User): ValidationResult => {
    const schema = Joi.object({
        username: Joi.string().required(),
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).message('enter a correct email please'),
    });

    return schema.validate(user);
};