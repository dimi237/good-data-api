import config from 'convict-config';
import { validateCreateRequest } from '../validation';
import { Response, NextFunction } from 'express';
import multer from "multer";
import httpContext from 'express-http-context';
import { camelCase } from 'lodash';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.get("filePath"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, camelCase(req.body.name) + '_' + uniqueSuffix + '_' + file?.originalname)
    }
})
const upload = multer({ storage: storage })
export const requestMiddleware = [upload.array("files"), (req: Request, res: Response, next: NextFunction): void => {

    if (req.method === 'POST') {
        next();
        const { error } = validateCreateRequest(req.body as any);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else { next(); }
    } else { next(); }
}]