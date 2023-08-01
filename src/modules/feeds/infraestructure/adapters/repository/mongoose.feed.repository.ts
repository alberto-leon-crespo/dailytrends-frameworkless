import { BaseRepository } from "../../../../commons/domain/repositories/base.repository";
import { FeedDomainRepository } from "../../../domain/ports/feed.domain.repository";
import { FeedDomain } from "../../../domain/feed.domain";
import { FeedDocument } from "../schema/feed.schema";
import { Optional } from "typescript-optional";
import { injectable } from "inversify";
import { FeedMapperService } from "../../../domain/services/feed.mapper.service";
import { FeedEntity } from "../../entity/feed.entity";

@injectable()
export class MongooseFeedRepository extends BaseRepository<FeedEntity, FeedDomain, FeedDocument> implements FeedDomainRepository {

    constructor(
        private feedMapperService: FeedMapperService,
    ) {
        // This workaround solves problems with entended services in inversify
        super();
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
}