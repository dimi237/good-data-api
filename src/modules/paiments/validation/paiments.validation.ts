import Joi, { ValidationResult } from 'joi';
import { Paiment } from '../models';

export const validateCreatePaiment = (paiment: Paiment): ValidationResult => {
    const schema = Joi.object({
        label: Joi.string().required(),
        value: Joi.string().required(),
        file: Joi.any(),
    });

    return schema.validate(paiment);
};