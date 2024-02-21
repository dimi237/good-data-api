import { validateLogin, validateRegister } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { Credentials } from '../models';
import { User } from 'modules/users';

export const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateLogin(req.body as Credentials);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};

export const validateRegisterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateRegister(req.body as User);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};