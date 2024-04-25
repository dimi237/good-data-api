import { Inscription } from "./models";
import { InscriptionRepository } from "./inscriptions.repository";
import { BaseService } from "common";
import { Service } from "typedi";


@Service()
export class InscriptionsService extends BaseService<Inscription> {

    constructor(private readonly inscriptionRepository: InscriptionRepository) {
        super(inscriptionRepository);
    }

}
