import { BaseCommand } from "../../../commons/infraestructure/console/base.command";
import { container } from "../../../../bootstrap";
import { GetAllFeedsQuery } from "../../application/queries/get-all-feeds.query";
import { CreateNewCommand } from "../../../news/application/commands/create-new.command";

export class FeedsSeederCommand extends BaseCommand {

    private getAllFeedsQuery: GetAllFeedsQuery;
    private createNewCommand: CreateNewCommand;
    constructor() {
        super("feeds", "Seed feeds collection with initial data", "1");
        this.getAllFeedsQuery = container.get<GetAllFeedsQuery>(GetAllFeedsQuery);
        this.createNewCommand = container.get<CreateNewCommand>(CreateNewCommand);
        this.setup();
    }

    setup(): void {
        this
            .getCommand()
            .command('read')
            .action(async () => {
                const feeds = await this.getAllFeedsQuery.run();
                const feedsNews: { [key: string]: any } = {};
                const finalNews = [];
                for (const index in feeds) {
                    const feed = feeds[index];
                    await feed.initializeReader();
                    feedsNews[feed.getId()] = await feed.read();
                }
                for (const feedId in feedsNews) {
                    const news = feedsNews[feedId];
                    for (const newData of news) {
                        finalNews.push({
                            ...newData,
                            feed_id: feedId,
                        });
                    }
                }
                for (const newData of finalNews) {
                    await this.createNewCommand.run(newData);
                }
                process.exit();
            })
    }
}
