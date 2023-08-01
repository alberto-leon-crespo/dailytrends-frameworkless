import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";
import { Optional } from "typescript-optional";
import { CreateFeedDto } from "../../infraestructure/dtos/create-feed.dto";

@injectable()
export class DeleteFeedCommand implements UsecaseInterface {
    public constructor(
        private mongooseFeedRepository: MongooseFeedRepository
    ) {}

    public async run(id: string): Promise<Optional<FeedDomain>> {
        return this.mongooseFeedRepository.deleteFeed(id);
    }
}