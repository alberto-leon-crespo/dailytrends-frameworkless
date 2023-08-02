import { BaseCommand } from "./base.command";
import { MigrationsService } from "../ddbb/migrations/migrations.service";

export class MigrationsCommand extends BaseCommand {

    constructor() {
        super("migrations", "Migrations handling command", "1");
        this.setup();
    }

    setup(): void {
        this.getCommand()
            .command('create <migrationName>')
            .option('-d, --directory <directoryPath>', 'Set directory creation for migration', process.cwd())
            .option('-m, --module <moduleName>', 'Set module name for migrations service', process.cwd())
            .description('Creates a new migration')
            .action(async (migrationName, options) => {
                console.log("Hola")
            })

        this.getCommand()
            .command('list')
            .description('List all migrations')
            .action(async () => {
                console.log("Hola")
            });

        this.getCommand()
            .command('up')
            .description('Run migrations up call')
            .action(async () => {
                console.log("Hola")
            });

        this.getCommand()
            .command('down')
            .description('Run migrations down call')
            .action(async () => {
                console.log("Hola")
            });
    }
}
