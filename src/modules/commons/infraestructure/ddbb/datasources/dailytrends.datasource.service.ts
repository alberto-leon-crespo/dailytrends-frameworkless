import { injectable } from 'inversify';
import mongoose from 'mongoose';
import {ConfigService} from "../../domain/services/config.service";
import {CommonsModule} from "../../commons.module";
import {LoggerService} from "../../domain/services/logger.service";

@injectable()
export class DailytrendsDatasourceService {

    public connection!: mongoose.Connection;

    constructor(private configService: ConfigService, private loggerService: LoggerService) {}

    public initializeConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            const mongoUri = this.configService.getModuleConfig(CommonsModule.name, 'database.uri');
            const db = this.configService.getModuleConfig(CommonsModule.name, 'database.database');
            this.connection = mongoose.createConnection(
                mongoUri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                } as any
            );
            console.log(mongoUri);
            this.connection.useDb(db);

            this.connection.once('error', error => {
                this.loggerService.error('Error while connecting to MongoDB:', error);
                reject(error);
            });

            this.connection.once('open', () => {
                this.loggerService.info('Connected successfully to MongoDB!');
                resolve();
            });
        });
    }
}