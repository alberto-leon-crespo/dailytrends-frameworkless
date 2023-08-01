import { ContainerModule, interfaces } from 'inversify';
import { FeedController } from "./infraestructure/controllers/feed.controller";
import { ConfigService } from "../commons/domain/services/config.service";
import { MongooseFeedRepository } from "./infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedMapperService } from "./domain/services/feed.mapper.service";
import { GetAllFeedsQuery } from "./application/queries/get-all-feeds.query";
import { GetFeedByIdQuery } from "./application/queries/get-feed-by-id.query";
import { CreateFeedCommand } from "./application/commands/create-feed.command";
import { UpdateFeedCommand } from "./application/commands/update-feed.command";
import { ModuleInitializatorInterface } from "../commons/domain/modules/interfaces/module.initializator.interface";
import path from 'path';
import {DeleteFeedCommand} from "./application/commands/delete-feed.command";

export class FeedsModule implements ModuleInitializatorInterface {
    public async initialize(container: interfaces.Container): Promise<void> {
        const moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<FeedController>(FeedController).toSelf();
            bind<MongooseFeedRepository>(MongooseFeedRepository).toSelf();
            bind<FeedMapperService>(FeedMapperService).toSelf();
            bind<GetAllFeedsQuery>(GetAllFeedsQuery).toSelf();
            bind<GetFeedByIdQuery>(GetFeedByIdQuery).toSelf();
            bind<CreateFeedCommand>(CreateFeedCommand).toSelf();
            bind<UpdateFeedCommand>(UpdateFeedCommand).toSelf();
            bind<DeleteFeedCommand>(DeleteFeedCommand).toSelf();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(FeedsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
    }
}