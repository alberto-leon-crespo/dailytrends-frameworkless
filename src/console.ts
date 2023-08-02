import 'reflect-metadata';
import { Command } from 'commander';
import { TestCommand } from './modules/commons/infraestructure/console/test.command';
import { MigrationsCommand } from "./modules/commons/infraestructure/console/migrations.command";
import { bootstrap } from "./bootstrap";

const program = new Command();

program
    .version('1.0.0')
    .description('Console commands handler.');

const commands = [
    new TestCommand(),
    new MigrationsCommand(),
];

// Initialize container
bootstrap().then(containerInstance => {

    commands.forEach(commandInstance => {
        commandInstance.setContainer(containerInstance);
        program.addCommand(commandInstance.getCommand())
    });

    program.parse(process.argv);

    if (process.argv.length <= 2) {
        console.log('Available commands:\n\n');
        commands.forEach((command) => {
            console.log(`- ${command.getCommandName()}: ${command.getCommandDescription()}\n\n`);
        });
    } else {
        program.parse(process.argv);
    }

    process.exit(0);
});