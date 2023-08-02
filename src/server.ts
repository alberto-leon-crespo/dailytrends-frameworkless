import { bootstrap } from "./bootstrap";
import { LoggerService } from "./modules/commons/domain/services/logger.service";
import { ConfigService } from "./modules/commons/domain/services/config.service";
import { CommonsModule } from "./modules/commons/commons.module";
import { ServerBuilder } from "./modules/commons/domain/server/server.builder";

bootstrap().then((container) => {
    const logger = container.get<LoggerService>(LoggerService);
    const configService = container.get<ConfigService>(ConfigService);
    const port = configService.getModuleConfig(CommonsModule.name, 'app.port', 3000);

    const serverInstance = ServerBuilder.build(container, {rootPath: "/api"});
    serverInstance.listen(port, 'localhost', () => {
        logger.info(`Server started on port ${port} :)`);
    });
});