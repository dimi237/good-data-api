import Container, { Service } from 'typedi';
import { PaimentsController } from './paiements.controller';
import { Paiment } from './models';
import { paimentMiddleware } from './middleware';
import { BaseRouter } from 'common/base/base.route';


@Service()
export class PaimentRouter extends BaseRouter<PaimentsController, Paiment> {

    constructor(controller: PaimentsController) {
        super(controller);
    }

}

const paimentRouter = Container.get(PaimentRouter)
const router = paimentRouter.getRouter(...paimentMiddleware);

export default router;

