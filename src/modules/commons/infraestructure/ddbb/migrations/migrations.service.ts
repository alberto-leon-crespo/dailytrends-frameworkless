import { injectable } from "inversify";
import { MigrationServiceInterface } from "./interfaces/migration-service.interface";
import * as path from "path";
import * as child_process from "child_process";
import * as util from "util";
import * as fs from "fs";
import {ConfigService} from "../../../domain/services/config.service";
import {CommonsModule} from "../../../commons.module";
import {LoggerService} from "../../../domain/services/logger.service";

const exec = util.promisify(child_process.exec);

@injectable()
export class MigrationsService implements MigrationServiceInterface {
    private migrations!: [];

    public constructor(private configService: ConfigService, private loggerService: LoggerService) {
        this.migrations = this.configService.getModuleConfig(CommonsModule.name, 'database.migrations');
    }
    async runMigrations(): Promise<void> {
        for (const migrationsDir of this.migrations) {
            const resolvedMigrationsDir = path.resolve(__dirname, migrationsDir);
            if (fs.existsSync(resolvedMigrationsDir)) {
                this.loggerService.info(`Running migrations from ${resolvedMigrationsDir}`);
                try {
                    await exec(`migrate up -m ${resolvedMigrationsDir}`);
                    this.loggerService.info(`Migrations from ${resolvedMigrationsDir} completed.`);
                } catch (error) {
                    this.loggerService.error(`Error running migrations from ${resolvedMigrationsDir}: ${error}`);
                }
            } else {
                this.loggerService.info(`Directory ${resolvedMigrationsDir} does not exist. Skipping.`);
            }
        }
    }
}