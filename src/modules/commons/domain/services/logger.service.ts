import {LoggerServiceInterface} from "./interfaces/logger.service.interface";
import pino from 'pino';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements LoggerServiceInterface {
    private logger: pino.Logger;

    constructor() {
        this.logger = pino({
            level: 'info', // configure log level as desired
        });
    }

    fatal(message: string, ...args: any[]) {
        this.logger.fatal(message, ...args);
    }

    error(message: string, ...args: any[]) {
        this.logger.error(message, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.logger.warn(message, ...args);
    }

    info(message: string, ...args: any[]) {
        this.logger.info(message, ...args);
    }

    debug(message: string, ...args: any[]) {
        this.logger.debug(message, ...args);
    }

    trace(message: string, ...args: any[]) {
        this.logger.trace(message, ...args);
    }
}