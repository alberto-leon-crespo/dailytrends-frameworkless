import { ContainerModule, interfaces } from 'inversify';
import { NewController } from "./infraestructure/controllers/new.controller";
import { ConfigService } from "../commons/domain/services/config.service";
import { MongooseNewRepository } from "./infraestructure/adapters/repository/mongoose.new.repository";
import { NewMapperService } from "./domain/services/new.mapper.service";
import { GetNewsByFeedIdQuery } from "./application/queries/get-news-by-feed-id.query";
import { GetNewByIdQuery } from "./application/queries/get-new-by-id.query";
import { CreateNewCommand } from "./application/commands/create-new.command";
import { UpdateNewCommand } from "./application/commands/update-new.command";
import { ModuleInitializatorInterface } from "../commons/domain/modules/interfaces/module.initializator.interface";
import path from 'path';
import {DeleteNewCommand} from "./application/commands/delete-new.command";

export class NewsModule implements ModuleInitializatorInterface {
    public async initialize(container: interfaces.Container): Promise<void> {
        const moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<NewController>(NewController).toSelf().inSingletonScope();
            bind<MongooseNewRepository>(MongooseNewRepository).toSelf().inSingletonScope();
            bind<NewMapperService>(NewMapperService).toSelf().inSingletonScope();
            bind<GetNewsByFeedIdQuery>(GetNewsByFeedIdQuery).toSelf().inSingletonScope();
            bind<GetNewByIdQuery>(GetNewByIdQuery).toSelf().inSingletonScope();
            bind<CreateNewCommand>(CreateNewCommand).toSelf().inSingletonScope();
            bind<UpdateNewCommand>(UpdateNewCommand).toSelf().inSingletonScope();
            bind<DeleteNewCommand>(DeleteNewCommand).toSelf().inSingletonScope();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(NewsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
    }
}