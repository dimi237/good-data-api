import { BaseRepository } from "common";
import { Service } from "typedi";


@Service()
export class RequestRepository extends BaseRepository {

    constructor() { super(); }

}
