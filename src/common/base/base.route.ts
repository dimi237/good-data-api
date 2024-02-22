import 'reflect-metadata';
import express from 'express';
import { BaseController } from './base.controller';
import { BaseModel } from '..';
import { Inject, Service } from 'typedi';
import { UsersController } from 'modules/users';

@Service()
export abstract class BaseRouter {
    @Inject()
    controller: UsersController;

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


