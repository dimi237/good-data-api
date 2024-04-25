import { BaseModel } from 'common';

export interface Paiment extends BaseModel {
    label: string;
    value: string;
    image: string;
}