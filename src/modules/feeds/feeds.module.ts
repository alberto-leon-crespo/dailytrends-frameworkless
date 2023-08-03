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
import {SeedFeedsCommand} from "./application/commands/seed-feeds.command";
import {ReadFeedsQuery} from "./application/queries/read-feeds.query";
import {ReadFeedsAndSaveNewsFlow} from "./application/flow/read-feeds-and-save-news.flow";

export class FeedsModule implements ModuleInitializatorInterface {
    public async initialize(container: interfaces.Container): Promise<void> {
        const moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<FeedController>(FeedController).toSelf().inSingletonScope();
            bind<MongooseFeedRepository>(MongooseFeedRepository).toSelf().inSingletonScope();
            bind<FeedMapperService>(FeedMapperService).toSelf().inSingletonScope();
            bind<GetAllFeedsQuery>(GetAllFeedsQuery).toSelf().inSingletonScope();
            bind<GetFeedByIdQuery>(GetFeedByIdQuery).toSelf().inSingletonScope();
            bind<CreateFeedCommand>(CreateFeedCommand).toSelf().inSingletonScope();
            bind<UpdateFeedCommand>(UpdateFeedCommand).toSelf().inSingletonScope();
            bind<DeleteFeedCommand>(DeleteFeedCommand).toSelf().inSingletonScope();
            bind<SeedFeedsCommand>(SeedFeedsCommand).toSelf().inSingletonScope();
            bind<ReadFeedsQuery>(ReadFeedsQuery).toSelf().inSingletonScope();
            bind<ReadFeedsAndSaveNewsFlow>(ReadFeedsAndSaveNewsFlow).toSelf().inSingletonScope();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(FeedsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
    }
}