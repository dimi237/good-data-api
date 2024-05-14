import { BaseModel } from 'common';
import moment from 'moment';
export class Request implements BaseModel {
    _id?: any;
    user: {
        _id: string;
        fullName: string;
        username: string;
        tel: string;
        email: string;

    };
    code: string;
    name: string;
    desc: string;
    type: string;
    preferences: string;
    field: string;
    delay: number;
    attachements?: Attachement[];
    files?: Express.Multer.File[];
    dates?: {
        created: number;
        updated?: number;
    }
    status?: RequestStatus;
    payementData?: any;
    reason?: any;
    links?: string[];
    amount?: any;
    deliverables?: {
        attachements?: Attachement[];
        links?: string[];
    }
    updateData?: UpdateData[]
}

export interface Attachement {
    path?: string;
    fileName?: string;
    contenType?: string;
    uploaded?: boolean;
}


export interface UpdateData {
    userId?: string;
    username?: string;
    date?: number;
    status?: RequestStatus;
}


export enum RequestStatus {
    INITIATED = 100,
    VALIDATED = 200,
    CANCELED = 300,
    REJECTED = 400,
    PAID = 500,
    CLOSED = 600,
}
