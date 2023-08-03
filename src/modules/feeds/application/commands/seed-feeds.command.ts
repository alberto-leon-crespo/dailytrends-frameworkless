import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseFeedRepository } from "../../infraestructure/adapters/repository/mongoose.feed.repository";
import {container} from "../../../../bootstrap";

@injectable()
export class SeedFeedsCommand implements UsecaseInterface {

    private mongooseFeedRepository: MongooseFeedRepository;
    public constructor() {
        this.mongooseFeedRepository = container.get<MongooseFeedRepository>(MongooseFeedRepository);
    }

    public async run(): Promise<void> {
        return await this.mongooseFeedRepository.seedFeeds();
    }
}