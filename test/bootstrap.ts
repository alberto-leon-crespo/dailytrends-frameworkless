import 'reflect-metadata';
import {MongoMemoryServer} from "mongodb-memory-server";
import {ServerBuilder} from "../src/modules/commons/domain/server/server.builder";
import shell from "shelljs";
import {Container} from "inversify";
import {bootstrap as appBootstrap} from "../src/bootstrap";
import http from "http";

let app: Express.Application;
let serverInstance: http.Server;
let mongoServer: MongoMemoryServer;
export interface TestInstance {
    app: Express.Application,
    mongoServer: MongoMemoryServer,
    serverInstance: http.Server,
    container: Container
}

const instances: Map<string, TestInstance> = new Map<string, TestInstance>();
let lastAssignedPort = 3000;

export const bootstrap = async (instaceReference: string, provision = false) => {
    mongoServer = await MongoMemoryServer.create();
    process.env.DATABASE_MONGO_URL = mongoServer.getUri();
    const container: Container = await appBootstrap();
    const init = await ServerBuilder.build(
        container,
        {
            rootPath: "/api"
        },
        lastAssignedPort
    );
    lastAssignedPort++;
    app = init.app;
    serverInstance = init.serverInstance;
    if (provision) {
        // provision of feeds and news for memory server
        const resultSeed = shell.exec('npm run console:dev -- feeds seed');
        if (resultSeed.code !== 0) {
            throw new Error('Error seeding memory database with basic feeds info');
        }
        const resultNewsRead = shell.exec('npm run console:dev -- feeds read');
        if (resultNewsRead.code !== 0) {
            throw new Error('Error reading feeds news.');
        }
    }
    const instance: TestInstance = {app, mongoServer, container, serverInstance} as TestInstance;
    instances.set(instaceReference, instance);
    return instance;
};
export const tearDown = async (instaceReference: string) => {
    if (instances.has(instaceReference)) {
        const instance = instances.get(instaceReference);
        if (instance) {
            instance.mongoServer.stop();
            instance.serverInstance.close();
            instances.delete(instaceReference);
        }
    }
}

