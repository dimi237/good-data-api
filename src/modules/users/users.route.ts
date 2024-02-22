import { Container, Service } from 'typedi';
import { validateCreateUserMiddleware } from './middleware';
import { UsersController } from './users.controller';
import express, { NextFunction, Request, Response } from 'express';


@Service()
class UserRouter {
    constructor(private readonly usersController: UsersController) { }
    getRouter() {
        const router = express.Router();

        router.post('/', validateCreateUserMiddleware,  (req: Request, res: Response, next: NextFunction)  => this.usersController.createUser(req, res, next));

        router.get('/all', (req: Request, res: Response, next: NextFunction) => this.usersController.getUsers(req, res, next));

        router.get('/pull', (req: Request, res: Response, next: NextFunction) => this.usersController.getUserById(req, res, next));
        return router
    }
}

const userRouter = Container.get(UserRouter)
const router = userRouter.getRouter()

export default router;