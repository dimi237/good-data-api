import { Program } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { ProgamsService } from "./programs.service";


@Service()
export class ProgramsController extends BaseController<Program> {

  constructor(service: ProgamsService) {
    super(service);
  }


}
