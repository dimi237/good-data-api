import { BaseRepository } from "common";
import { Service } from "typedi";


@Service()
export class ProgramsRepository extends BaseRepository {

    constructor() { super(); }

}
