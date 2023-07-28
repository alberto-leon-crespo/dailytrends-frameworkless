import { ContainerModule, interfaces } from 'inversify';
import { DailytrendsDatasourceService } from './infraestructure/ddbb/datasources/dailytrends.datasource.service';
import { ConfigService } from './domain/services/config.service';
import { LoggerService } from "./domain/services/logger.service";
import { ModuleInitializatorInterface } from "./domain/modules/interfaces/module.initializator.interface";
import path from "path";

export class CommonsModule implements ModuleInitializatorInterface {
    public async initialize(container: interfaces.Container): Promise<void> {
        const moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<ConfigService>(ConfigService).toSelf();
            bind<LoggerService>(LoggerService).toSelf();
            bind<DailytrendsDatasourceService>(DailytrendsDatasourceService).toSelf().inSingletonScope();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(CommonsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
        const datasource = container
            .get<DailytrendsDatasourceService>(DailytrendsDatasourceService);
        await datasource.initializeConnection();
    }
}