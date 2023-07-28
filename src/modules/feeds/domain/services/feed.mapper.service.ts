import { getModelForClass } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { Types } from 'mongoose';
import { MapperInterface } from "../../../commons/domain/mapper/mapper.interface";
import { DomainFeed } from "../domain.feed";
import { FeedDocument } from "../../infraestructure/adapters/schema/feed.schema";
import { Optional } from "typescript-optional";
import { FeedEntity } from "../../infraestructure/entity/feed.entity";

@injectable()
export class FeedMapperService implements MapperInterface<DomainFeed, FeedDocument> {
    private feedModel;

    constructor() {
        this.feedModel = getModelForClass(FeedDocument);
    }

    public toDomain(feedEntity: FeedEntity): Optional<DomainFeed> {
        if (!feedEntity) {
            return Optional.empty<DomainFeed>();
        }
        const feed = new DomainFeed(
            feedEntity.id,
            feedEntity.name,
            feedEntity.url,
        );
        return Optional.of(feed);
    }

    public toDomains(feedEntities: FeedEntity[]): DomainFeed[] {
        const feeds = new Array<DomainFeed>();
        feedEntities.forEach((feedEntity) => {
            const feed = this.toDomain(feedEntity);
            feeds.push(feed.get());
        });
        return feeds;
    }
}