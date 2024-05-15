import { BaseService, errorMsg } from "common";
import { Service } from "typedi";
import { RequestRepository } from "./request.repository";
import { Attachement, Request, RequestStatus } from "./models";
import { isEmpty } from "lodash";
import {  UserCategory, UsersService } from "..";
import moment from "moment";
import { NotificationsService, TemplateLabel } from "modules/notifications";
import { StorageService } from "modules/storage/storage.service";


@Service()
export class RequestService extends BaseService<Request> {

    constructor(private readonly requestRepository: RequestRepository,
        private readonly notificationsService: NotificationsService,
        private readonly storageService: StorageService,
        private usersService: UsersService) {
        super(requestRepository);
    }

    async createRequest(email: string, request: Request) {
        try {
            const { name, files } = request;

            const user = await this.usersService.findOne({filter:{email}});

            const { _id, fname, lname, username, tel } = user;

            const existingName = await this.requestRepository.findOne({ filter: { name, 'user._id': _id.toString()} });

            if (!isEmpty(existingName)) { throw new Error(errorMsg.NAME_USED); }

            request.user = {
                _id:_id.toString() ,
                username,
                tel,
                email,
                fullName: `${fname} ${lname}`
            }
            if (files) {
                request.attachements = files?.map((file) => {
                    return {
                        path: file.path,
                        fileName: file.filename,
                        contenType: file.mimetype,
                    }
                })
            }

            delete request.files;

            request.status = RequestStatus.INITIATED;
            request.code = generateCode(username);
            const result = await this.create(request);
            
            await this.notificationsService.sendEmailNotification(email, TemplateLabel.REQUEST_INITIATED_TO_USER, { fname, lname });
            const admins = await this.usersService.getAdminUsers();
            if(!isEmpty(admins)){
                await Promise.all(admins.map((admin)=> {
                this.notificationsService.sendEmailNotification(admin?.email, TemplateLabel.REQUEST_INITIATED_TO_ADMIN, { fname: admin?.fname, lname: admin?.lname,request });
                }));
            }

            this.uploadManyRequestFiles(result.data, request.attachements || []);
            return result;
        }
        catch (error) { throw (error); }
    }
    async updateRequestStatus(email:string, code: string, data: any) {
        try {
            const { status } = data;

            const mapping = {
                100: {
                    100: [200, 400],
                    200: [500],
                    300: [],
                    400: [200],
                    500: [600],
                    600: []
                },
                200: {
                    100: [300],
                    200: [300],
                    300: [100],
                    400: [100],
                    500: [],
                    600: []
                }
            }

            const request = await this.findOne({ filter: { code } });

            if (!request) { throw new Error(errorMsg.NOT_FOUND) }

            const user = await this.usersService.findOne({filter:{email}});

            const isAuthorized = mapping[user.category][request.status || 100].includes(status as never)

            if (!isAuthorized) { throw new Error(errorMsg.UNAUTHORIZED) }
            let addData: any = {};
            if (status === 200) {
                const { amount } = data;
                if (!amount) { throw new Error(errorMsg.NOT_COMPLETE) }
                addData.amount = amount;
            }
            if (status === 400) {
                const { reason } = data;
                if (!reason) { throw new Error(errorMsg.NOT_COMPLETE) }
                addData.reason = reason;
            }
            let { updateData } = request;

            updateData = updateData || [];

            updateData.push({
                userId: user._id.toString(),
                username: user.username,
                date: moment().valueOf(),
                status: status
            });

            const response = await this.update({ code }, { status, updateData, ...addData })
            const {fullName} = request?.user;
            const templateUserLabel = getNotificationMapping(status)
            const templateAdminLabel = getNotificationMapping(status,true)
            if (templateUserLabel) {
                await this.notificationsService.sendEmailNotification(email, templateUserLabel, { fullName, request: {...request, ...addData }});
            }

            if (templateAdminLabel) {
                const admins = await this.usersService.getAdminUsers();
                if(!isEmpty(admins)){
                    await Promise.all(admins.map((admin)=> {
                    this.notificationsService.sendEmailNotification(admin?.email, templateAdminLabel, { fname: admin?.fname, lname: admin?.lname,request });
                    }));
                }
            }

            return response;

        }
        catch (error) { throw (error); }
    }

    async countRequest(email: string, query: any) {
        try {
            const user = await this.usersService.findOne({filter:{email}});
            const { _id } = user;
            const { category } = user;

            if (category === UserCategory.ADMIN) {
                return await this.count(query);
            }
            else {
                query = { ...query, 'user._id': _id.toString() }
                return await this.count(query);
            }
        }

        catch (error) { throw (error); }
    }
    async findRequest(email:string, query: any) {
        try {
            const user = await this.usersService.findOne({filter:{email}});

            const { _id } = user;

            const { category } = user;

            if (category === UserCategory.ADMIN) {
                return await this.findAll(query);
            }
            else {
                query.filter = { ...query.filter, 'user._id': _id.toString() }
                return await this.findAll(query);
            }
        }

        catch (error) { throw (error); }
    }

    async updateRequestByAdmin(code: string, newrequest: any) {
        try {
            let { files, links, attachements } = newrequest;


            const request = await this.findOne({ filter: { code } });

            if (!request) { throw new Error(errorMsg.NOT_FOUND) }

            attachements = attachements ? JSON.parse(attachements) : [];
            links = links ? JSON.parse(links) : [];

            if (files) {
                attachements.push(...files?.map((file: any) => {
                    return {
                        path: file.path,
                        fileName: file.filename,
                        contenType: file.mimetype,
                    }
                }))
            }

            delete request.files;

            const response = await this.update({ code }, { deliverables: { links, attachements } })
            //TODO send notification

            this.uploadManyRequestFiles(request._id.toString(), request.attachements || [], true);

            return response;
        }
        catch (error) { throw (error); }
    }

    async getRequestChart(email:string) {
        try {
            const user = await this.usersService.findOne({filter:{email}});
            const { _id } = user;


            const { category } = user;

            const query = category === UserCategory.USER ?{ 'user._id':_id.toString()}  :{};
            const countClosed= await this.count({ ...query, status: RequestStatus.CLOSED  });
            const countCanceled = await this.count({ ...query, status: RequestStatus.CANCELED  });
            const countPending =  await this.count({ ...query, status:{$in: [RequestStatus.INITIATED, RequestStatus.PAID, RequestStatus.VALIDATED, RequestStatus.REJECTED]}  });
            return [countClosed?.count || 0,countCanceled?.count || 0,countPending?.count || 0];
        }
        catch (error) { throw (error); }
    }

     private async uploadManyRequestFiles(_id:string, attachements: Attachement[], isDelivrable?:boolean) {
        try {  
          
            const newAttachements = await Promise.all(
                attachements.map(async (elt)=>{
                    if (!elt.uploaded && elt.fileName && elt.path) {
                        const data = await this.storageService.uploadFile(elt.fileName, elt.path);
                        return {...elt, path: data.Location}
                    }
                    return elt; 
                })
            )

            return isDelivrable ? this.update({_id}, {'deliverables.attachements':newAttachements}): this.update({_id}, {attachements:newAttachements})
        }
        catch (error) { throw (error); }
    }

}

function generateCode(username: string) {
    const now = new Date();
    const timestamp = now.getTime();
    const code = username.substring(0, 2).toUpperCase() + timestamp.toString().substring(timestamp.toString().length - 6);
    return code;
}

function getNotificationMapping(status: RequestStatus, admin?: boolean){
   const mappingAdmin: any = {
    300: TemplateLabel.REQUEST_CANCELED_TO_ADMIN,
   }

   const mappingUser: any = {
    200: TemplateLabel.REQUEST_VALIDATED_TO_USER,
    300: TemplateLabel.REQUEST_CANCELED_TO_USER,
    400:TemplateLabel.REQUEST_REJECTED_TO_USER,
    500:TemplateLabel.REQUEST_PAID_TO_USER,
    600:TemplateLabel.REQUEST_CLOSED_TO_USER,
   }

   return admin ? mappingAdmin[status] : mappingUser[status];
}
