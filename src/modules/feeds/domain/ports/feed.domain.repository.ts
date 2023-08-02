import { FeedDomain } from '../feed.domain';
import {Optional} from "typescript-optional";

export interface FeedDomainRepository {
    getAllFeeds(): Promise<FeedDomain[]>;
    /**
     * Returns feed filtered by id
     * @returns a `Feed` object containing the data.
     * @param id string
     */
    getFeed(id: string): Promise<Optional<FeedDomain>>;

    createFeed(feed: FeedDomain): Promise<Optional<FeedDomain>>;

    deleteFeed(feedId: string): Promise<Optional<FeedDomain>>;

    updateFeed(feedId: string, feed: FeedDomain): Promise<Optional<FeedDomain>>;
}