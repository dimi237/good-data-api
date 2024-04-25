import { Paiment } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { PaimentsService } from "./paiments.service";
import { NextFunction, Request, Response } from "express";


@Service()
export class PaimentsController extends BaseController<Paiment> {

  constructor(service: PaimentsService) {
    super(service);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.create({ ...req.body, image: req.file?.filename })); }
    catch (error) { next(error); }
  }


}
