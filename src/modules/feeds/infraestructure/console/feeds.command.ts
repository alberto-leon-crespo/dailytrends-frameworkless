import { BaseCommand } from "../../../commons/infraestructure/console/base.command";
import {injectable} from "inversify";
import {MongooseFeedRepository} from "../adapters/repository/mongoose.feed.repository";
import {container} from "../../../../bootstrap";
import {GetAllFeedsQuery} from "../../application/queries/get-all-feeds.query";
import {CreateNewCommand} from "../../../news/application/commands/create-new.command";
import {NewDomain} from "../../../news/domain/new.domain";

export class FeedsCommand extends BaseCommand {

    private mongooseFeedRepository: MongooseFeedRepository;
    private getAllFeedsQuery: GetAllFeedsQuery;
    private createNewCommand: CreateNewCommand;
    constructor() {
        super("feeds", "Feeds command to manage feeds", "1");
        this.mongooseFeedRepository = container.get<MongooseFeedRepository>(MongooseFeedRepository);
        this.getAllFeedsQuery = container.get<GetAllFeedsQuery>(GetAllFeedsQuery);
        this.createNewCommand = container.get<CreateNewCommand>(CreateNewCommand);
        this.setup();
    }

    setup(): void {
        this
            .getCommand()
            .command('seed')
            .action(async () => {
                await this.mongooseFeedRepository.seedFeeds();
            })
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
                    if (newData.author && newData.title && newData.link && newData.feed_id) {
                        await this.createNewCommand.run(newData);
                    }
                }
                process.exit();
            })
    }
}
