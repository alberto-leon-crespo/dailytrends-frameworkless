import { BaseCommand } from "../../../commons/infraestructure/console/base.command";
import {container} from "../../../../bootstrap";
import { CreateNewCommand } from "../../../news/application/commands/create-new.command";
import { ReadFeedsQuery } from "../../application/queries/read-feeds.query";
import {SeedFeedsCommand} from "../../application/commands/seed-feeds.command";
import {ReadFeedsAndSaveNewsFlow} from "../../application/flow/read-feeds-and-save-news.flow";

export class FeedsCommand extends BaseCommand {

    private readFeedsNewsAndSaveNewsFlow: ReadFeedsAndSaveNewsFlow;
    private seedFeeds: SeedFeedsCommand;
    constructor() {
        super("feeds", "Feeds command to manage feeds", "1");
        this.seedFeeds = container.get<SeedFeedsCommand>(SeedFeedsCommand);
        this.readFeedsNewsAndSaveNewsFlow = container.get<ReadFeedsAndSaveNewsFlow>(ReadFeedsAndSaveNewsFlow);
        this.setup();
    }

    setup(): void {
        this
            .getCommand()
            .command('seed')
            .action(async () => {
                await this.seedFeeds.run();
                process.exit(0);
            })
        this
            .getCommand()
            .command('read')
            .action(async () => {
                await this.readFeedsNewsAndSaveNewsFlow.run();
            })
    }
}
