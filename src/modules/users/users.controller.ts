import { User } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { UsersService } from "./users.service";
import { NextFunction, Request, Response } from 'express';


@Service()
export class UsersController {

  constructor(private readonly service: UsersService) {
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.create(req.body)); }
    catch (error) { next(error); }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.findAll({ filter: req.query })); }
    catch (error) { next(error); }
  }

  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.findOne({ filter: req.query })); }
    catch (error) { next(error); }
  }


  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.findById(req.params.id)); }
    catch (error) { next(error); }
  }

  async count(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.count(req.query)); }
    catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.update(req.query, req.body)); }
    catch (error) { next(error); }
  }


  async createUser(req: Request, res: Response, next: NextFunction) {
    try { res.send(await this.service.createUser(req.body as User)); }
    catch (error) { next(error); }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try { res.send(await this.service.findOne({ filter: req.query })); }
    catch (error) { next(error); }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try { res.send(await this.service.getUserById(req.query)); }
    catch (error) { next(error); }
  }

}
