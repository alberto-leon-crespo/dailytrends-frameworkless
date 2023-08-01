import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";
import { Optional } from "typescript-optional";
import { CreateFeedDto } from "../../infraestructure/dtos/create-feed.dto";
import {GetFeedByIdQuery} from "../queries/get-feed-by-id.query";

@injectable()
export class UpdateFeedCommand implements UsecaseInterface {
    public constructor(
        private mongooseFeedRepository: MongooseFeedRepository,
        private getFeedByIdQuery: GetFeedByIdQuery
    ) {}

    public async run(id: string, feed: CreateFeedDto): Promise<Optional<FeedDomain>> {
        const feedData: FeedDomain = await this.getFeedByIdQuery.run(id) as unknown as FeedDomain;
        return this.mongooseFeedRepository.updateFeed(id, new FeedDomain(feed._id, feed.name, feed.url, feed.selectors));
    }
}