import { BaseRepository } from "../../../../commons/domain/repositories/base.repository";
import { FeedDomainRepository } from "../../../domain/ports/feed.domain.repository";
import { FeedDomain } from "../../../domain/feed.domain";
import { FeedDocument, FeedModel } from "../schema/feed.schema";
import { Optional } from "typescript-optional";
import { injectable } from "inversify";
import { FeedMapperService } from "../../../domain/services/feed.mapper.service";
import { FeedEntity } from "../../entity/feed.entity";
import { container } from "../../../../../bootstrap";
import { LoggerService } from "../../../../commons/domain/services/logger.service";
import FeedsSeeds from "../../seeds/feeds.json";
import {ConfigService} from "../../../../commons/domain/services/config.service";

@injectable()
export class MongooseFeedRepository extends BaseRepository<FeedEntity, FeedDomain, FeedDocument> implements FeedDomainRepository {

    private feedMapperService: FeedMapperService;
    private loggerService: LoggerService;
    private configService: ConfigService;

    constructor() {
        // This workaround solves problems with entended services in inversify
        super();
        this.feedMapperService = container.get<FeedMapperService>(FeedMapperService);
        this.loggerService = container.get<LoggerService>(LoggerService);
        this.configService = container.get<ConfigService>(ConfigService);
        this.setModel(FeedDocument);
        this.setMapper(this.feedMapperService);
    }

    public createFeed(feed: FeedDomain): Promise<Optional<FeedDomain>> {
        return this.create(feed);
    }

    public deleteFeed(feedId: string): Promise<Optional<FeedDomain>> {
        return this.delete(feedId);
    }

    public getAllFeeds(): Promise<FeedDomain[]> {
        return this.getAll();
    }

    public getFeed(id: string): Promise<Optional<FeedDomain>> {
        return this.getDetail(id);
    }

    public updateFeed(feedId: string, feed: FeedDomain): Promise<Optional<FeedDomain>> {
        return this.getDatailAndUpdate(feedId, feed);
    }

    public async seedFeeds(): Promise<void> {
        const count = await FeedModel.countDocuments({}).exec();

        if (count === 0) {
            this.log('Feeds collection its empty. Seeding initial data...');
            await FeedModel.insertMany(FeedsSeeds);
            this.log('Feeds collection seeding success.');
        }
    }

    private log(message: string) {
        if (this.configService.getEnv('CONSOLE_ENV') === 'true') {
            console.log(message);
        } else {
            this.loggerService.info(message);
        }
    }
}