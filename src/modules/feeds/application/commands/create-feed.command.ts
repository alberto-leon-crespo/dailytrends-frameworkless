import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";
import { Optional } from "typescript-optional";
import { CreateFeedDto } from "../../infraestructure/dtos/create-feed.dto";

@injectable()
export class CreateFeedCommand implements UsecaseInterface {
    public constructor(private mongooseFeedRepository: MongooseFeedRepository) {}

    public run(feed: CreateFeedDto): Promise<Optional<FeedDomain>> {
        const feedDomain = new FeedDomain(feed._id, feed.name, feed.url, feed.selectors);
        return this.mongooseFeedRepository.createFeed(feedDomain);
    }
}