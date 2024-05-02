import { BaseModel } from 'common';

export interface Notification extends BaseModel {
    _id?: any;
    message: string;
    type?: 'SMS' | 'EMAIL',
    status?: NotificationStatus
}

export interface Sms extends Notification {
    _id?: any;
    tel: string;
    type?: 'SMS'
}

export interface Email extends Notification {
    _id?: any;
    email: string;
    object: string;
    cc: string;
    attachements: Attachement[];
    type?: 'EMAIL'

}

export interface Attachement {
    content?: string;
    contentType?: string;
    name?: string;
}

export interface BulkNotifications extends BaseModel {
    senderEmail: string;
    status?: NotificationStatus
    dates?: {
        recieved?: number;
        send?: number
    }
    notifications: Notification[];
}

export type EmailTemplate = {
    label: TemplateLabel;
    subject: string;
    getBody: (data: any) => string;
}

export type DataToBind = {
    body: string;
    subject: string;
}

export enum TemplateLabel {
    INSCRIPTION_TO_USER = 'INSCRIPTION_TO_USER',
    INSCRIPTION_TO_ADMIN = 'INSCRIPTION_TO_ADMIN',
    ADMIN_CREATED_TO_USER = 'ADMIN_CREATED_TO_USER',
    ADMIN_CREATED_TO_ADMIN = 'ADMIN_CREATED_TO_ADMIN',
    INSCRIPTION_FORMATION_TO_USER = 'INSCRIPTION_FORMATION_TO_USER',
    INSCRIPTION_FORMATION_TO_ADMIN = 'INSCRIPTION_FORMATION_TO_ADMIN',
    REQUEST_INITIATED_TO_ADMIN = 'REQUEST_INITIATED_TO_ADMIN',
    REQUEST_INITIATED_TO_USER = 'REQUEST_INITIATED_TO_USER',
    REQUEST_VALIDATED_TO_USER = 'REQUEST_VALIDATED_TO_USER',
    REQUEST_VALIDATED_TO_ADMIN = 'REQUEST_VALIDATED_TO_ADMIN',
    REQUEST_CANCELED_TO_USER = 'REQUEST_CANCELED_TO_USER',
    REQUEST_CANCELED_TO_ADMIN = 'REQUEST_CANCELED_TO_ADMIN',
    REQUEST_REJECTED_TO_USER = 'REQUEST_REJECTED_TO_USER',
    REQUEST_REJECTED_TO_ADMIN = 'REQUEST_REJECTED_TO_ADMIN',
    REQUEST_PAID_TO_USER = 'REQUEST_PAID_TO_USER',
    REQUEST_PAID_TO_ADMIN = 'REQUEST_PAID_TO_ADMIN',
    REQUEST_CLOSED_TO_USER = 'REQUEST_CLOSED_TO_USER',
    REQUEST_CLOSED_TO_ADMIN = 'REQUEST_CLOSED_TO_ADMIN',
}

export type NotificationStatus = 'INITIATED' | 'PENDING' | 'STOPPED' | 'PAUSED' | 'PROCESSING' | 'FAILED' | 'SUCCESS';

