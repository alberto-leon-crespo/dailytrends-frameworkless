import { BaseCommand } from "../../../commons/infraestructure/console/base.command";
import {injectable} from "inversify";
import {MongooseFeedRepository} from "../adapters/repository/mongoose.feed.repository";
import {container} from "../../../../bootstrap";

export class FeedsSeederCommand extends BaseCommand {

    private mongooseFeedRepository: MongooseFeedRepository;
    constructor() {
        super("feeds", "Seed feeds collection with initial data", "1");
        this.mongooseFeedRepository = container.get<MongooseFeedRepository>(MongooseFeedRepository);
        this.setup();
    }

    setup(): void {
        this
            .getCommand()
            .command('seed')
            .action(async () => {
                await this.mongooseFeedRepository.seedFeeds();
            })
    }
}
