import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";

@injectable()
export class GetAllFeedsQuery implements UsecaseInterface {
    public constructor(private mongooseFeedRepository: MongooseFeedRepository) {}

    public run(): Promise<FeedDomain[]> {
        return this.mongooseFeedRepository.getAllFeeds();
    }
}