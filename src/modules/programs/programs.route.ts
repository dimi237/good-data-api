import Container, { Service } from 'typedi';
import { ProgramsController } from './programs.controller';
import { Program } from './models';
import { programMiddleware } from './middleware';
import { BaseRouter } from 'common/base/base.route';


@Service()
export class ProgramRouter extends BaseRouter<ProgramsController, Program> {

    constructor(controller: ProgramsController) {
        super(controller);
    }

}

const programRouter = Container.get(ProgramRouter)
const router = programRouter.getRouter(programMiddleware);

export default router;

