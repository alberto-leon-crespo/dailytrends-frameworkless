import { ContainerModule, interfaces } from 'inversify';
import {FeedController} from "./infraestructure/controllers/feed.controller";
import {ConfigService} from "../commons/domain/services/config.service";
import path from 'path';

export class FeedsModule {
    public async initialize(container: interfaces.Container): Promise<void> {
        let moduleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            bind<FeedController>(FeedController).toSelf();
        });
        container.load(moduleContainer);
        const configService = container.get<ConfigService>(ConfigService);
        configService.setModuleConfigContext(FeedsModule.name, path.resolve(__dirname, 'infraestructure', 'config'))
    }
}