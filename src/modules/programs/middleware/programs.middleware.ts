import { validateCreateProgram } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { Program } from '../models';


export const programMiddleware =(req: Request, res: Response, next: NextFunction): void => {

    if (req.method === 'POST') {
        const { error } = validateCreateProgram(req.body as Program);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else { next(); }
    } else { next(); }
};