import { BaseModel } from 'common';

export interface Program extends BaseModel {
    label: string;
    description: string;
    tags: string;
}