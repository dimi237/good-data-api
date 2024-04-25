import { Inscription } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { InscriptionsService } from "./inscription.service";


@Service()
export class InscriptionsController extends BaseController<Inscription> {

  constructor(service: InscriptionsService) {
    super(service);
  }
}
