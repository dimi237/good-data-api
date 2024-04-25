import { BaseService, errorMsg, respMsg } from "common";
import { Service } from "typedi";
import { RequestRepository } from "./request.repository";
import { Request, RequestStatus } from "./models";
import { isEmpty } from "lodash";
import httpContext from 'express-http-context';
import { User, UserCategory } from "..";
import { UsersRepository } from "modules/users/users.repository";
import moment from "moment";


@Service()
export class RequestService extends BaseService<Request> {

    constructor(private readonly requestRepository: RequestRepository,
        private readonly userRepository: UsersRepository) {
        super(requestRepository);
    }

    async createRequest(request: Request) {
        try {
            const { name, files } = request;

            const user = httpContext.get('user') as User;

            const { email, _id, fname, lname, username, tel } = user;
            const existingName = await this.requestRepository.findOne({ filter: { name, 'user._id': _id } });

            if (!isEmpty(existingName)) { throw new Error(errorMsg.NAME_USED); }

            request.user = {
                _id,
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
            return result;
        }
        catch (error) { throw (error); }
    }
    async updateRequestStatus(code: string, data: any) {
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

            const user = httpContext.get('user') as User;

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

            //TODO send notification

            return response;

        }
        catch (error) { throw (error); }
    }


    async findRequest(query: any) {
        try {
            const authUser = httpContext.get('user');
            const { _id } = authUser;

            const user = await this.userRepository.findById(_id) as unknown as User;

            const { category } = user;

            if (category === UserCategory.ADMIN) {
                return await this.findAll(query);
            }
            else {
                query.filter = { ...query.filter, 'user._id': _id }
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

            return response;
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
