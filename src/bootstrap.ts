import 'reflect-metadata';
import { ContainerBuilder } from "./modules/commons/domain/ioc/container.builder";
import { CommonsModule } from "./modules/commons/commons.module";
import { FeedsModule } from "./modules/feeds/feeds.module";
import { ModuleLoader } from "./modules/commons/domain/modules/module.loader";

const container = ContainerBuilder.build({autoBindInjectable: true});

const bootstrap = async () => {

    const moduleLoader = new ModuleLoader([
        new CommonsModule(),
        new FeedsModule()
    ], container);

    await moduleLoader.initialize()

    return container;
}

export {bootstrap, container}
