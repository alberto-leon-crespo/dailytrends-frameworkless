import 'reflect-metadata';
import { Command } from 'commander';
import { TestCommand } from './modules/commons/infraestructure/console/test.command';
import { FeedsCommand } from "./modules/feeds/infraestructure/console/feeds.command";
import { bootstrap } from "./bootstrap";
import {BaseCommand} from "./modules/commons/infraestructure/console/base.command";

const program = new Command();

program
    .version('1.0.0')
    .description('Console commands handler.');

// Initialize container
bootstrap().then( async containerInstance => {

    const commands = new Map<string, BaseCommand>();

    commands.set(TestCommand.name, new TestCommand());
    commands.set(FeedsCommand.name, new FeedsCommand());

    commands.forEach(commandInstance => {
        program.addCommand(commandInstance.getCommand())
    });

    await program.parseAsync(process.argv);

    process.exit(0);
});