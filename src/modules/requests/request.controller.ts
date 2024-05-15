import { Request as RequestModel } from "./models";
import { Service } from "typedi";
import { BaseController } from 'common';
import { RequestService } from "./request.service";
import { NextFunction, Response, Request } from "express";


@Service()
export class RequestController extends BaseController<RequestModel> {

    constructor(service: RequestService) {
        super(service);
    }
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.createRequest(req.headers.email, { ...req.body, files: req.files })); }
        catch (error) { next(error); }
    }
    async count(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.countRequest(req.headers.email,req.params)); }
        catch (error) { next(error); }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.findRequest(req.headers.email,{ filter: req.query })); }
        catch (error) { next(error); }
    }

    async updateRequestStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.updateRequestStatus(req.headers.email,req.params.code, req.body)); }
        catch (error) { next(error); }
    }

    async updateRequestByAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.updateRequestByAdmin(req.params.code, { ...req.body, files: req.files })); }
        catch (error) { next(error); }
    }

    async getRequestChart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.getRequestChart(req.headers.email,req.params)); }
        catch (error) { next(error); }
    }

    async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { res.send(await this.service.uploadManyRequestFiles(req.params)); }
        catch (error) { next(error); }
    }
}
