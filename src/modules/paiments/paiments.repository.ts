import { BaseRepository } from "common";
import { Service } from "typedi";


@Service()
export class PaimentsRepository extends BaseRepository {

    constructor() { super(); }

}
