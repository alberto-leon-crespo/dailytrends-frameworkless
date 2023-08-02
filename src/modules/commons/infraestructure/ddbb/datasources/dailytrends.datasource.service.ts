import {inject, injectable} from 'inversify';
import mongoose from 'mongoose';
import {ConfigService} from "../../../domain/services/config.service";
import {CommonsModule} from "../../../commons.module";
import {LoggerService} from "../../../domain/services/logger.service";
import {container} from "../../../../../bootstrap";

@injectable()
export class DailytrendsDatasourceService {

    public connection!: typeof mongoose;
    private configService: ConfigService;
    private loggerService: LoggerService;

    constructor() {
        this.configService = container.get<ConfigService>(ConfigService);
        this.loggerService = container.get<LoggerService>(LoggerService);
    }

    public async initializeConnection(): Promise<void> {
        const mongoUri = this.configService.getModuleConfig(CommonsModule.name, 'database.uri');
        const db = this.configService.getModuleConfig(CommonsModule.name, 'database.database');
        try {
            this.connection = await mongoose.connect(
                mongoUri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                } as any
            );
            // Disabling bufferCommands to prevent buffer error. See on https://mongoosejs.com/docs/connections.html
            this.connection.set('bufferCommands', false);
            this.loggerService.info('Connected successfully to MongoDB!');
        } catch (error: any) {
            this.loggerService.error('Error while connecting to MongoDB:', error.message);
        }
    }
}