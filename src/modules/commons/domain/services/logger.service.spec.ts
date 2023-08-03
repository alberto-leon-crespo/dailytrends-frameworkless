import 'reflect-metadata';
import { LoggerService } from './logger.service';
import pino from 'pino';
import { ConfigService } from './config.service';
import { container } from '../../../../bootstrap';
import { Logger } from 'pino';

jest.mock('pino');
jest.mock('./config.service');
jest.mock('../../../../bootstrap', () => ({
    container: {
        get: jest.fn(),
    },
}));

describe('LoggerService', () => {
    let service: LoggerService;
    let loggerMock: jest.Mocked<Logger>;
    let configMock: jest.Mocked<ConfigService>;

    beforeEach(() => {
        loggerMock = {
            fatal: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            trace: jest.fn(),
        } as unknown as jest.Mocked<Logger>;

        (pino as jest.MockedFunction<typeof pino>).mockReturnValue(loggerMock);

        configMock = new ConfigService() as jest.Mocked<ConfigService>;
        configMock.getEnv.mockReturnValue('true');
        (container.get as jest.MockedFunction<typeof container.get>).mockReturnValue(configMock);

        service = new LoggerService();
    });

    it('should call the corresponding logger method', () => {
        const message = 'Test message';
        const args = ['Test arg1', 'Test arg2'];

        service.fatal(message, ...args);
        expect(loggerMock.fatal).toHaveBeenCalledWith(message, ...args);

        service.error(message, ...args);
        expect(loggerMock.error).toHaveBeenCalledWith(message, ...args);

        service.warn(message, ...args);
        expect(loggerMock.warn).toHaveBeenCalledWith(message, ...args);

        service.info(message, ...args);
        expect(loggerMock.info).toHaveBeenCalledWith(message, ...args);

        service.debug(message, ...args);
        expect(loggerMock.debug).toHaveBeenCalledWith(message, ...args);

        service.trace(message, ...args);
        expect(loggerMock.trace).toHaveBeenCalledWith(message, ...args);
    });
});