import { Paiment } from "./models";
import { PaimentsRepository } from "./paiments.repository";
import { BaseService } from "common";
import { Service } from "typedi";


@Service()
export class PaimentsService extends BaseService<Paiment> {

    constructor(private readonly paimentRepository: PaimentsRepository) {
        super(paimentRepository);
    }

}
