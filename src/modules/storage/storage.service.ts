import { Service } from "typedi";
import { logger } from "winston-config";
import { S3 } from 'aws-sdk';
import { getBucket } from "./config";
import fs from "fs";
import config from 'convict-config';
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { promisify } from "util";
@Service()
export class StorageService {
    private readonly bucket: S3
    constructor() {
        this.bucket = getBucket()
    }


    listObjects(): void {
        logger.debug("List objects")
        const bucketParams = {
            Bucket: 'vol1'
        }
    
        this.bucket.listObjects(bucketParams, (err, data) => {
            if(err) {
                console.error("Error ", err)
            } else {
                console.info("Objects vol1 ", data)
            }
        })
    }

    async uploadFile(filename: string, path: string) {
        const fileStream = fs.createReadStream(path)
        const params: PutObjectRequest = {Bucket: config.get('storage.bucket'),ACL:'public-read', Key: filename, Body: fileStream}
        return await this.bucket.upload(params).promise();
    }

}
