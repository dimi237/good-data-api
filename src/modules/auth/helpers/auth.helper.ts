import moment from "moment";
import jwt from 'jsonwebtoken';
import { Token } from "../models";
import { config } from 'convict-config';
import { CommonService } from "common/services/common.service";

export const create = (payload: any): Token => {
    const issued = getCurrDateSeconds();
    const ttl = issued + parseInt(config.get('tokenTTL'), 10);
    const options = { expiresIn: `${ttl}` }

    const access_token = jwt.sign({ payload }, `${config.get('tokenSalt')}`, options);

    const refresh_token = jwt.sign({ payload: { payload } }, `${config.get('tokenSalt')}`, options);

    return { access_token, refresh_token, token_type: 'Bearer', issued, expires_in: ttl }
}

const getCurrDateSeconds = (): number => {
    return moment().valueOf() / 1000 | 0;
}