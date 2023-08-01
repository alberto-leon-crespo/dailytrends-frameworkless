import { Config, Migrator } from 'mongodb-migrations';
import { ConfigService } from "../../../domain/services/config.service";
import { injectable } from "inversify";
import { CommonsModule } from "../../../commons.module";

@injectable()
class MigrateService {
    private migrators: typeof Migrator[];

    constructor(private configService: ConfigService) {
        this.migrators = [];
        const migrations = this.configService.getModuleConfig(CommonsModule.name, 'database.migrations');
        this.addModule(migrations);
    }

    public addModule(path: string): void {
        const config: typeof Config = {
            migrationsDir: path,
            mongodb: {
                // Aquí va la configuración de MongoDB
                url: this.configService.getModuleConfig(CommonsModule.name, 'database.uri'),
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
                databaseName: this.configService.getModuleConfig(
                    CommonsModule.name,
                    'database.database'
                ),
                migrationsCollection: this.configService.getModuleConfig(
                    CommonsModule.name,
                    'database.migrations_collection_name'
                )
            }
        };
        this.migrators.push(new Migrator(config));
    }

    public async runMigrations(): Promise<void> {
        for (const migrator of this.migrators) {
            await migrator.run();
        }
    }
}