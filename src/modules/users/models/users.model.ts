import { BaseModel } from 'common';
import moment from 'moment';

export class User implements BaseModel {
    _id?: any;
    username: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    category: UserCategory
    token?: string;
    studentProfile?: StudentProfile;
    connectionHistory: ConnectionHistory[];
    dates?: {
        created: number;
        updated?: number;
    }

    constructor(fname: string, lname: string, username: string, email: string, password: string, category: UserCategory, studentProfile?: StudentProfile) {
        this.fname = fname;
        this.lname = lname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.category = category;
        this.dates = {
            created: moment().valueOf(),
        }
        if (studentProfile) {
            this.studentProfile = studentProfile;
        }
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
    STUDENT = 200
}


export type StudentProfile = {
    level: string;
    school: string;
    field: string;
    year: number;
}