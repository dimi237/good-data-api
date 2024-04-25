import Joi, { ValidationResult } from 'joi';
import { Request } from '../models';

export const validateCreateRequest = (request: Request): ValidationResult => {
    const schema = Joi.object({
        desc: Joi.string().required(),
        type: Joi.string().required(),
        name: Joi.string().required(),
        preferences: Joi.string().empty(''),
        field: Joi.string(),
        delay: Joi.number(),
        attachements: Joi.any(),
        links: Joi.array(),
    });

    return schema.validate(request);
};