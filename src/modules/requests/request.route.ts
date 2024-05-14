import Container, { Service } from 'typedi';
import { RequestController } from './request.controller';
import { Request } from './models';
import { requestMiddleware } from './middleware';
import { BaseRouter } from 'common/base/base.route';


@Service()
export class RequestRouter extends BaseRouter<RequestController, Request> {

    constructor(controller: RequestController) {
        super(controller);
    }

    getCustomRouter = (middleware?: any) => {
        const router = this.getRouter(middleware);
        router.put('/:code/status', middleware, (req: any, res: any, next: any) => this.controller.updateRequestStatus(req, res, next));
        router.put('/:code/admin', middleware, (req: any, res: any, next: any) => this.controller.updateRequestByAdmin(req, res, next));
        router.get('/charts/count', middleware, (req: any, res: any, next: any) => this.controller.getRequestChart(req, res, next));
        router.get('/upload/file', middleware, (req: any, res: any, next: any) => this.controller.upload(req, res, next));
        return router;
    }

}

const requestRouter = Container.get(RequestRouter)
const router = requestRouter.getCustomRouter(...requestMiddleware);

export default router;

