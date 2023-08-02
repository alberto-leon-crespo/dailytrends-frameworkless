import { ContainerModule, interfaces } from 'inversify';
import { ConfigService } from "../commons/domain/services/config.service";
import { MongooseNewRepository } from "./infraestructure/adapters/repository/mongoose.new.repository";
import { NewMapperService } from "./domain/services/new.mapper.service";
import { ModuleInitializatorInterface } from "../commons/domain/modules/interfaces/module.initializator.interface";
import { CreateNewCommand } from "./application/commands/create-new.command";
import path from 'path';
import { GetNewsByFeedIdQuery } from "./application/queries/get-news-by-feed-id.query";

export class NewsModule implements ModuleInitializatorInterface {
    public async initialize(container: interfaces.Container): Promise<void> {
        const moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<MongooseNewRepository>(MongooseNewRepository).toSelf().inSingletonScope();
            bind<NewMapperService>(NewMapperService).toSelf().inSingletonScope();
            bind<CreateNewCommand>(CreateNewCommand).toSelf().inSingletonScope();
            bind<GetNewsByFeedIdQuery>(GetNewsByFeedIdQuery).toSelf().inSingletonScope();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(NewsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
    }
}