import { Command } from 'commander';
import { Container } from 'inversify';

interface CommandOption {
    flags: string;
    description: string;
    defaultValue?: any;
}

// Definimos una interfaz para los argumentos del comando.
interface CommandArgument {
    syntax: string;
    description: string;
}

export abstract class BaseCommand {
    private _container!: Container;
    private _command!: Command;
    constructor(
        private _name: string,
        private _description: string,
        private _version: string
    ) {
        this._command = new Command();
        this._command.name(this._name).description(this._description).version(this._version);
    }

    // Método para agregar opciones al comando.
    protected addOption(option: CommandOption): void {
        this._command.option(option.flags, option.description, option.defaultValue);
    }

    // Método para agregar argumentos al comando.
    protected addArgument(argument: CommandArgument): void {
        this._command.argument(argument.syntax, argument.description);
    }

    // Método para establecer la acción del comando.
    protected setAction(action: (...args: any[]) => void | Promise<void>): void {
        this._command.action(action);
    }

    // Este método debe ser sobreescrito por las clases que heredan de BaseCommand.
    abstract setup(): void;

    // Devuelve el comando configurado.
    public getCommand(): Command {
        return this._command;
    }

    public getCommandName() {
        return this._name;
    }

    public getCommandDescription() {
        return this._description;
    }

    public getCommandVersion() {
        return this._version;
    }

    public getContainer() {
        return this._container;
    }
}