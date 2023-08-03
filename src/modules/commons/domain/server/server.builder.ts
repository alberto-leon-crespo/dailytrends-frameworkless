import { InversifyExpressServer, RoutingConfig } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import expressPino from "pino-http";
import { Container } from "inversify";
import {LoggerService} from "../services/logger.service";
import {ConfigService} from "../services/config.service";
import {CommonsModule} from "../../commons.module";
import swaggerDocument from '../../../../../docs/swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';
import http from "http";

export class ServerBuilder {
    public static build(container: Container, routingConfig: RoutingConfig, overridePort?: number):
        Promise<{ app: Express.Application, serverInstance: http.Server }>
    {
        return new Promise((resolve: any, reject: any) => {
            const server = new InversifyExpressServer(container, null, routingConfig);

            server.setConfig((expressApp) => {
                // add body parser
                expressApp.use(bodyParser.urlencoded({
                    extended: true
                }));
                expressApp.use(bodyParser.json());
                expressApp.use(expressPino());
                expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
            });

            const logger = container.get<LoggerService>(LoggerService);
            const configService = container.get<ConfigService>(ConfigService);
            let port = configService.getModuleConfig(CommonsModule.name, 'app.port', 3000);

            if (overridePort) {
                port = overridePort;
            }

            const app = server.build();

            const serverInstance = app.listen(port, 'localhost', () => {
                logger.info(`Server started on port ${port} :)`);
                resolve({
                    app,
                    serverInstance
                });
            }).on('error', reject);
        })
    }
}