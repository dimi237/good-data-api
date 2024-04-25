import { User } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { UsersService } from "./users.service";
import { NextFunction, Request, Response } from 'express';


@Service()
export class UsersController extends BaseController<User> {

  constructor(service: UsersService) {
    super(service);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.createUser(req.body)); }
    catch (error) { next(error); }
  }

}
