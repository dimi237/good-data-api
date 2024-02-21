import 'module-alias/register';
import "reflect-metadata";
import { ExpressLoader } from 'loaders/express';
import { startDatabase } from 'database/mongodb';
import { logger } from 'winston-config';

startDatabase().then(async () => {
    logger.info("Database connection successful");
    new ExpressLoader();
}).catch((err: Error) => {
    console.error(err.stack);
    logger.error("Database connection failed \n", err.stack || '');
});