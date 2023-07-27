import 'reflect-metadata';
import { ContainerBuilder } from "./modules/commons/domain/ioc/container.builder";
import { CommonsModule } from "./modules/commons/commons.module";
import { FeedsModule } from "./modules/feeds/feeds.module";
import { ModuleLoader } from "./modules/commons/domain/modules/module.loader";
import { ServerBuilder } from "./modules/commons/domain/server/server.builder";

async function bootstrap() {
    const container = ContainerBuilder.build({autoBindInjectable: true});

    const moduleLoader = (new ModuleLoader([
        new CommonsModule(),
        new FeedsModule()
    ], container));

    await moduleLoader.initialize()

    const serverInstance = ServerBuilder.build(container, {rootPath: "/api"})

    serverInstance.listen(3000, 'localhost', () => {
        console.log('Server started on port 3000 :)');
    });

    return container;
}

bootstrap();
