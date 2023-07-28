import { BaseRepository } from "../../../../commons/domain/repositories/base.repository";
import { DomainFeedRepository } from "../../../domain/ports/domain.feed.repository";
import { DomainFeed } from "../../../domain/domain.feed";
import { FeedDocument } from "../schema/feed.schema";
import { FeedMapperService } from "../../../domain/services/feed.mapper.service";


export class MongooseFeedRepository extends BaseRepository<DomainFeed, FeedDocument> implements DomainFeedRepository {

    constructor(feedMapperService: FeedMapperService) {
        super(FeedDocument, feedMapperService);
    }

    public createFeed(feed: DomainFeed): Promise<DomainFeed> {
        return this.create(feed);
    }

    public deleteFeed(feedId: string): Promise<DomainFeed | null> {
        return this.delete(feedId);
    }

    public getAllFeeds(): Promise<DomainFeed[]> {
        return this.getAll();
    }

    public getFeed(id: string): Promise<DomainFeed | null> {
        return this.getDetail(id);
    }

    public updateFeed(feedId: string, feed: DomainFeed): Promise<DomainFeed | null> {
        return this.updateDocument(feedId, feed);
    }
}