import Joi, { ValidationResult } from 'joi';
import { Inscription } from '../models';

export const validateCreateInscription = (inscription: Inscription): ValidationResult => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().required(),
        level: Joi.string().required(),
        situation: Joi.string().required(),
    });

    return schema.validate(inscription);
};