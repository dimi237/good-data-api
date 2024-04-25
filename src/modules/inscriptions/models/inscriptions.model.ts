import { BaseModel } from 'common';

export interface Inscription extends BaseModel {
    fname: string;
    lname: string;
    tel: string;
    email: string;
    level: string;
    situation: string;
    location: string;
}