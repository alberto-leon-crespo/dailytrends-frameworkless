import { BaseRepository } from "../../../../commons/domain/repositories/base.repository";
import { NewDomainRepository } from "../../../domain/ports/new.domain.repository";
import { NewDomain } from "../../../domain/new.domain";
import { NewDocument, NewModel } from "../schema/new.schema";
import { Optional } from "typescript-optional";
import { injectable } from "inversify";
import { NewMapperService } from "../../../domain/services/new.mapper.service";
import { NewEntity } from "../../entity/new.entity";
import { container } from "../../../../../bootstrap";
import { LoggerService } from "../../../../commons/domain/services/logger.service";
import { ConfigService } from "../../../../commons/domain/services/config.service";

@injectable()
export class MongooseNewRepository extends BaseRepository<NewEntity, NewDomain, NewDocument> implements NewDomainRepository {

    private feedMapperService: NewMapperService;
    private loggerService: LoggerService;
    private configService: ConfigService;

    constructor() {
        // This workaround solves problems with entended services in inversify
        super();
        this.feedMapperService = container.get<NewMapperService>(NewMapperService);
        this.loggerService = container.get<LoggerService>(LoggerService);
        this.configService = container.get<ConfigService>(ConfigService);
        this.setModel(NewDocument);
        this.setMapper(this.feedMapperService);
    }

    public createNew(newObject: NewDomain): Promise<Optional<NewDomain>> {
        return this.create(newObject);
    }

    public deleteNew(newId: string): Promise<Optional<NewDomain>> {
        return this.delete(newId);
    }

    public getNewsByFeedId(feedId: string) {

    }

    public getAllNews(): Promise<NewDomain[]> {
        return this.getAll();
    }

    public getNew(id: string): Promise<Optional<NewDomain>> {
        return this.getDetail(id);
    }

    public updateNew(newId: string, feed: NewDomain): Promise<Optional<NewDomain>> {
        return this.getDatailAndUpdate(newId, feed);
    }

    private log(message: string) {
        if (this.configService.getEnv('CONSOLE_ENV') === 'true') {
            console.log(message);
        } else {
            this.loggerService.info(message);
        }
    }
}