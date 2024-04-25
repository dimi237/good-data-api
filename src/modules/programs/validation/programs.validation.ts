import Joi, { ValidationResult } from 'joi';
import { Program } from '../models';

export const validateCreateProgram = (program: Program): ValidationResult => {
    const schema = Joi.object({
        label: Joi.string().required(),
        description: Joi.string().required(),
    });

    return schema.validate(program);
};