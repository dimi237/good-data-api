import { validateCreateUser } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models';

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    if (req.method === 'POST') {
        const { error } = validateCreateUser(req.body as User);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else { next(); }
    } else { next(); }
};