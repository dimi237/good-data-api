import { Program } from "./models";
import { ProgramsRepository } from "./programs.repository";
import { BaseService } from "common";
import { Service } from "typedi";


@Service()
export class ProgamsService extends BaseService<Program> {

    constructor(private readonly programRepository: ProgramsRepository) {
        super(programRepository);
    }

}
