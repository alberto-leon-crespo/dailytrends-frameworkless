import { DomainFeed } from '../domain.feed';
import {Optional} from "typescript-optional";

export interface DomainFeedRepository {
    getAllFeeds(): Promise<DomainFeed[]>;
    /**
     * Returns feed filtered by id
     * @returns a `Feed` object containing the data.
     * @param id string
     */
    getFeed(id: string): Promise<Optional<DomainFeed>>;

    createFeed(feed: DomainFeed): Promise<Optional<DomainFeed>>;

    deleteFeed(feedId: string): Promise<Optional<DomainFeed>>;

    updateFeed(feedId: string, feed: DomainFeed): Promise<Optional<DomainFeed>>;
}