import {LoggerServiceInterface} from "./interfaces/logger.service.interface";
import pino from 'pino';
import { injectable } from 'inversify';
import {ConfigService} from "./config.service";
import {container} from "../../../../bootstrap";

@injectable()
export class LoggerService implements LoggerServiceInterface {
    private logger: pino.Logger;
    private configService!: ConfigService;

    constructor() {
        this.configService = container.get<ConfigService>(ConfigService);
        this.logger = pino({
            level: this.configService.getEnv('CONSOLE_ENV') === 'true' ? 'error' : 'info', // configure log level as desired,
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
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