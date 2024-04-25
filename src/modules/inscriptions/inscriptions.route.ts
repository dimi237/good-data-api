import Container, { Service } from 'typedi';
import { InscriptionsController } from './inscriptions.controller';
import { Inscription } from './models';
import { inscriptionMiddleware } from './middleware';
import { BaseRouter } from 'common/base/base.route';


@Service()
export class InscriptionRouter extends BaseRouter<InscriptionsController, Inscription> {

    constructor(controller: InscriptionsController) {
        super(controller);
    }

}

const inscriptionRouter = Container.get(InscriptionRouter)
const router = inscriptionRouter.getRouter(inscriptionMiddleware);

export default router;

