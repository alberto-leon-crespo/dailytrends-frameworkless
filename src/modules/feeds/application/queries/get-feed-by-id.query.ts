import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";
import {Optional} from "typescript-optional";
import {container} from "../../../../bootstrap";

@injectable()
export class GetFeedByIdQuery implements UsecaseInterface {
    private mongooseFeedRepository: MongooseFeedRepository;
    public constructor() {
        this.mongooseFeedRepository = container.get<MongooseFeedRepository>(MongooseFeedRepository)
    }

    public run(id: string): Promise<Optional<FeedDomain>> {
        return this.mongooseFeedRepository.getFeed(id);
    }
}