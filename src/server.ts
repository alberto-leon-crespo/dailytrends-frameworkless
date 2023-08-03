import { bootstrap } from "./bootstrap";
import { ServerBuilder } from "./modules/commons/domain/server/server.builder";

bootstrap().then( async (container) => {
    const serverInstance = await ServerBuilder.build(container, {rootPath: "/api"});
});