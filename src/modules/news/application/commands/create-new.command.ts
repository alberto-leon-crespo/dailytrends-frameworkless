import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import { MongooseNewRepository } from "../../infraestructure/adapters/repository/mongoose.new.repository";
import { NewDomain } from "../../domain/new.domain";
import { Optional } from "typescript-optional";
import { CreateNewDto } from "../../infraestructure/dtos/create-new.dto";
import {container} from "../../../../bootstrap";

@injectable()
export class CreateNewCommand implements UsecaseInterface {
    private mongooseFeedRepository: MongooseNewRepository;
    public constructor() {
        this.mongooseFeedRepository = container.get<MongooseNewRepository>(MongooseNewRepository);
    }

    public run(newObject: CreateNewDto): Promise<Optional<NewDomain>> {
        const newDomain = new NewDomain(newObject._id, newObject.name, newObject.url, newObject.selectors);
        return this.mongooseFeedRepository.createNew(newDomain);
    }
}