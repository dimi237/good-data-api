import { BaseRepository } from "common";
import { Service } from "typedi";


@Service()
export class InscriptionRepository extends BaseRepository {

    constructor() { super(); }

}
