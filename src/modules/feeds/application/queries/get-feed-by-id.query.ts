import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";
import {Optional} from "typescript-optional";

@injectable()
export class GetFeedByIdQuery implements UsecaseInterface {
    public constructor(private mongooseFeedRepository: MongooseFeedRepository) {}

    public run(id: string): Promise<Optional<FeedDomain>> {
        return this.mongooseFeedRepository.getFeed(id);
    }
}