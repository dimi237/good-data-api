import Container, { Service } from 'typedi';
import { UsersController } from './users.controller';
import { User } from './models';
import { userMiddleware } from './middleware';
import { BaseRouter } from 'common/base/base.route';
import express from 'express';


@Service()
export class UserRouter extends BaseRouter<UsersController, User> {

    constructor(controller: UsersController) {
        super(controller);
    }

}

const userRouter = Container.get(UserRouter)
const router = userRouter.getRouter(userMiddleware);

export default router;

