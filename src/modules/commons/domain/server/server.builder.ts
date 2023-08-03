import { InversifyExpressServer, RoutingConfig } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import expressPino from "pino-http";
import { Container } from "inversify";
import {LoggerService} from "../services/logger.service";
import {ConfigService} from "../services/config.service";
import {CommonsModule} from "../../commons.module";
import * as express from 'express';

export class ServerBuilder {
    public static build(container: Container, routingConfig: RoutingConfig): Promise<express.Application> {
        return new Promise((resolve: any, reject: any) => {
            const server = new InversifyExpressServer(container, null, routingConfig);

            server.setConfig((app) => {
                // add body parser
                app.use(bodyParser.urlencoded({
                    extended: true
                }));
                app.use(bodyParser.json());
                app.use(expressPino());
            });

            const logger = container.get<LoggerService>(LoggerService);
            const configService = container.get<ConfigService>(ConfigService);
            const port = configService.getModuleConfig(CommonsModule.name, 'app.port', 3000);

            const serverInstance = server.build();

            serverInstance.listen(port, 'localhost', () => {
                logger.info(`Server started on port ${port} :)`);
                resolve(serverInstance);
            }).on('error', reject);
        })
    }
}