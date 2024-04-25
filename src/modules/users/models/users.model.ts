import { BaseModel } from 'common';
import moment from 'moment';

export class User implements BaseModel {
    _id?: any;
    username: string;
    fname: string;
    lname: string;
    email: string;
    tel: string;
    password: string;
    category: UserCategory
    token?: TokenData;
    profile?: Profile;
    connectionHistory: ConnectionHistory[];
    dates?: {
        created: number;
        updated?: number;
    }
    enabled?: boolean;

    constructor(fname: string, lname: string, username: string, email: string, tel: string, password: string, category: UserCategory, profile?: Profile) {
        this.fname = fname;
        this.lname = lname;
        this.username = username;
        this.email = email;
        this.tel = tel;
        this.password = password;
        this.category = category;
        this.dates = {
            created: moment().valueOf(),
        }
        if (profile) {
            this.profile = profile;
        }
        this.enabled = true;
    }



    isValid() {
        return this.username && this.email && this.password;
    }
}

export interface ConnectionHistory {
    date: number;
    ip: string;
    location: string;
}


export enum UserCategory {
    ADMIN = 100,
    USER = 200
}


export type Profile = {
    profession: string;
    field: string;
}

export type TokenData = {
    refreshToken: string;
    accessToken: string;
    expiresIn: number;
}