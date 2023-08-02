import {InversifyExpressServer, RoutingConfig} from "inversify-express-utils";
import * as bodyParser from "body-parser";
import expressPino from "pino-http";
import {Container} from "inversify";

export class ServerBuilder {
    public static build(container: Container, routingConfig: RoutingConfig) {
        const server = new InversifyExpressServer(container, null, routingConfig);

        server.setConfig((app) => {
            // add body parser
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(expressPino());
        });

        return server.build();
    }
}