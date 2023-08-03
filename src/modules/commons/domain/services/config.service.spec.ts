import { ConfigService } from './config.service';
import { mock, when } from 'ts-mockito';
import * as dotenv from "dotenv";
import {bootstrap, tearDown} from "../../../../../test/bootstrap";
import {FeedMapperService} from "../../../feeds/domain/services/feed.mapper.service";
import {Container} from "inversify";
import {CommonsModule} from "../../commons.module";

let container: Container;

const mockedDotenv = mock(dotenv);

describe('ConfigService', () => {
    let service: ConfigService;

    beforeAll( async () => {
        const app = await bootstrap(__filename);
        container = app.container;
        service = container.get<ConfigService>(ConfigService);
    });

    afterAll(async () => {
        await tearDown(__filename);
    });

    it('should return true if env var exists', () => {
        process.env.TEST_VAR = 'test';
        expect(service.hasEnv('TEST_VAR')).toBe(true);
        delete process.env.TEST_VAR;
    });

    it('should return false if env var does not exist', () => {
        expect(service.hasEnv('NON_EXISTENT_VAR')).toBe(false);
    });

    it('should return env var if it exists', () => {
        process.env.TEST_VAR = 'test';
        expect(service.getEnv('TEST_VAR')).toBe('test');
        delete process.env.TEST_VAR;
    });

    it('should return default value if env var does not exist', () => {
        expect(service.getEnv('NON_EXISTENT_VAR', 'default')).toBe('default');
    });

    it('should return common module app.port config var', () => {
        expect(service.getModuleConfig(CommonsModule.name, 'app.port')).toBe(process.env.APP_PORT);
    });
});
