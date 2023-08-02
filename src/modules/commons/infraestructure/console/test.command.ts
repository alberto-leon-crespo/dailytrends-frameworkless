import { BaseCommand } from "./base.command";
import {injectable} from "inversify";

@injectable()
export class TestCommand extends BaseCommand {

    constructor() {
        super("test", "This is my test command", "1");
        this.setup();
    }

    setup(): void {
        this.addOption({
            flags: '-n, --name',
            description: 'Name to show',
        });
        this.setAction((options, command) => {
            if (options.name) {
                console.log(`Hello ${options.name}.`);
            } else {
                console.error('--name option is not provided.');
            }
        });
    }
}
