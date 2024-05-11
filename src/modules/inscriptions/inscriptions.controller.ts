import { Inscription } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { InscriptionsService } from "./inscription.service";
import { NextFunction,Response,Request } from "express";


@Service()
export class InscriptionsController extends BaseController<Inscription> {

  constructor(service: InscriptionsService) {
    super(service);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.inscription(req.body)); }
    catch (error) { next(error); }
  }
}
