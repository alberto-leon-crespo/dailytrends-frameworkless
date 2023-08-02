import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseNewRepository } from "../../infraestructure/adapters/repository/mongoose.new.repository";
import { NewDomain } from "../../domain/new.domain";
import { Optional } from "typescript-optional";
import { container } from "../../../../bootstrap";

@injectable()
export class GetNewsByFeedIdQuery implements UsecaseInterface {
    private mongooseFeedRepository: MongooseNewRepository;
    public constructor() {
        this.mongooseFeedRepository = container.get<MongooseNewRepository>(MongooseNewRepository);
    }

    public run(feedId: string): Promise<Optional<NewDomain>[]> {
        return this.mongooseFeedRepository.getNewsByFeedId(feedId);
    }
}