import { NextFunction, Request, Response } from 'express';
import { controllerInterface } from '../interfaces';
import { BaseService } from './base.service';
import { logger } from "winston-config";
import { BaseModel } from 'common/interfaces/model.interface';
import { Service } from 'typedi';


type ServiceType<T> = T extends BaseService<T extends BaseModel ? T : any> ? T : any;

@Service()
export class BaseController<T extends BaseModel> implements controllerInterface {

  protected logger;

  constructor(protected readonly service: ServiceType<T>) {
    this.logger = logger;
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

  async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.deleteById(req.params.id)); }
    catch (error) { next(error); }
  }

  async count(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.count(req.query)); }
    catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.update({ _id: req.params.id }, req.body)); }
    catch (error) { next(error); }
  }

  async enable(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.enable(req.params.id, req.body)); }
    catch (error) { next(error); }
  }

  async disable(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.disable(req.params.id, req.body)); }
    catch (error) { next(error); }
  }

}
