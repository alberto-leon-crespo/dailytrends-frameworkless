import { ContainerModule, interfaces } from 'inversify';
import {FeedController} from "./infraestructure/controllers/feed.controller";
import {ConfigService} from "../commons/domain/services/config.service";
import path from 'path';
import {MongooseFeedRepository} from "./infraestructure/adapters/repository/mongoose.feed.repository";
import {FeedMapperService} from "./domain/services/feed.mapper.service";

export class FeedsModule {
    public async initialize(container: interfaces.Container): Promise<void> {
        const moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<FeedController>(FeedController).toSelf();
            bind<MongooseFeedRepository>(MongooseFeedRepository).toSelf();
            bind<FeedMapperService>(FeedMapperService).toSelf();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(FeedsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
    }
}