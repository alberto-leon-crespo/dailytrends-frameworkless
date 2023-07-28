import { DomainFeed } from '../domain.feed';

export interface DomainFeedRepository {
    getAllFeeds(): Promise<DomainFeed[]>;
    /**
     * Returns feed filtered by id
     * @returns a `Feed` object containing the data.
     * @param id string
     */
    getFeed(id: string): Promise<DomainFeed | null>;

    createFeed(feed: DomainFeed): Promise<DomainFeed>;

    deleteFeed(feedId: string): Promise<DomainFeed | null>;

    updateFeed(feedId: string, feed: DomainFeed): Promise<DomainFeed | null>;
}