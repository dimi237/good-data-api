import { validateCreateInscription } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { Inscription } from '../models';


export const inscriptionMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    if (req.method === 'POST') {
        const { error } = validateCreateInscription(req.body as Inscription);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else { next(); }
    } else { next(); }
}