import express, { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { BaseModel } from '..';
import { Service } from 'typedi';

type ControllerType<T, M> = T extends BaseController<M extends BaseModel ? M : any> ? T : any;

@Service()
export abstract class BaseRouter<T, M> {

    constructor(public controller: ControllerType<T, M>) { }

    getRouter = (middleware?: any) => {
        const router = express.Router();

        router.get('/', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.findAll(req, res, next));

        router.post('/', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.create(req, res, next));

        router.get('/one', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.findOne(req, res, next));
        
        router.get('/count', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.count(req, res, next));
        
        router.get('/:id', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.findById(req, res, next));

        router.delete('/:id', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.deleteById(req, res, next));


        router.put('/:id', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.update(req, res, next));


        router.put('/enable/:id', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.enable(req, res, next));

        router.put('/disable/:id', middleware, (req: Request, res: Response, next: NextFunction) => this.controller.disable(req, res, next));

        return router;

    }
}


