import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import { FeedDomain } from "../../domain/feed.domain";
import {container} from "../../../../bootstrap";

@injectable()
export class ReadFeedsQuery implements UsecaseInterface {
    private mongooseFeedRepository: MongooseFeedRepository;
    public constructor() {
        this.mongooseFeedRepository = container.get<MongooseFeedRepository>(MongooseFeedRepository)
    }

    public run(): Promise<any> {
        return this.mongooseFeedRepository.readFeeds();
    }
}