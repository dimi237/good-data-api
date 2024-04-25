import { validateCreatePaiment } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { Paiment } from '../models';
import multer from "multer";
import httpContext from 'express-http-context';
import { camelCase } from 'lodash';
import config from 'convict-config';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.get("filePath"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        const user = httpContext.get('user');
        const { username } = user;
        cb(null, username + '_' + camelCase(req.body.name) + '_' + uniqueSuffix + '_' + file?.originalname)
    }
})
const upload = multer({ storage: storage })
export const paimentMiddleware = [upload.single("file"), (req: Request, res: Response, next: NextFunction): void => {

    if (req.method === 'POST') {
        next();
        const { error } = validateCreatePaiment(req.body as Paiment);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else { next(); }
    } else { next(); }
}]