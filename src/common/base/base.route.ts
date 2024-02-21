import express from 'express';
import { BaseController } from './base.controller';
import { BaseModel } from '..';
import { Service } from 'typedi';

type ControllerType<T, M> = T extends BaseController<M extends BaseModel ? M : any> ? T : any; 

@Service()
export abstract class BaseRouter<T, M> {

    constructor(public controller: ControllerType<T, M> ) { }

    getRouter = (middleware?: any) => {
        const router = express.Router();

        router.get('/', middleware, this.controller.findAll);

        router.post('/', middleware, this.controller.create);

        router.get('/:id', middleware, this.controller.findById);

        router.get('/one', middleware, this.controller.findOne);

        router.put('/:id', middleware, this.controller.update);

        router.post('/count', middleware, this.controller.findById);

        return router;

    }
}


