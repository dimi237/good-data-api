import { S3 } from 'aws-sdk';
import config from 'convict-config';
import { logger } from 'winston-config';

let bucket: S3;
export const startBucket = () => {
    const data = {
        endpoint: config.get('storage.host'),
        accessKeyId: config.get('storage.access'),
        secretAccessKey: config.get('storage.secret'),
    }

    logger.info(`config setted ${JSON.stringify(data)}`)
    bucket = new S3(data);
}

export const getBucket = () => {
    if (!bucket) { startBucket() }
    return bucket;
}

