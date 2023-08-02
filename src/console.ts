import 'reflect-metadata';
import { Command } from 'commander';
import { TestCommand } from './modules/commons/infraestructure/console/test.command';
import { FeedsSeederCommand } from "./modules/feeds/infraestructure/console/feeds.seeder.command";
import { bootstrap } from "./bootstrap";

const program = new Command();

program
    .version('1.0.0')
    .description('Console commands handler.');

// Initialize container
bootstrap().then( async containerInstance => {

    const commands = [
        new TestCommand(),
        new FeedsSeederCommand(),
    ];

    commands.forEach(commandInstance => {
        program.addCommand(commandInstance.getCommand())
    });

    await program.parseAsync(process.argv);

    process.exit(0);
});