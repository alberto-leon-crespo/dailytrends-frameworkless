import { getModelForClass } from '@typegoose/typegoose';
import { injectable } from 'inversify';
import { MapperInterface } from "../../../commons/domain/mapper/mapper.interface";
import { FeedDomain } from "../feed.domain";
import { FeedDocument } from "../../infraestructure/adapters/schema/feed.schema";
import { FeedModel } from "../../infraestructure/adapters/schema/feed.schema";
import { Optional } from "typescript-optional";
import { FeedEntity } from "../../infraestructure/entity/feed.entity";
import { Types } from "mongoose";

@injectable()
export class FeedMapperService implements MapperInterface<FeedEntity, FeedDomain, FeedDocument> {
    private feedModel;

    constructor() {
        this.feedModel = getModelForClass(FeedDocument);
    }

    public toDomain(feedEntity: FeedEntity): Optional<FeedDomain> {
        if (!feedEntity) {
            return Optional.empty<FeedDomain>();
        }
        const feed = new FeedDomain(
            feedEntity._id,
            feedEntity.name,
            feedEntity.url,
            feedEntity.selectors,
        );
        return Optional.of(feed);
    }

    public toDomains(feedEntities: FeedEntity[]): FeedDomain[] {
        const feeds = new Array<FeedDomain>();
        feedEntities.forEach((feedEntity) => {
            const feed = this.toDomain(feedEntity);
            feeds.push(feed.get());
        });
        return feeds;
    }

    public toSchema(domainFeed: FeedDomain): FeedDocument {
        return new FeedModel({
            _id: new Types.ObjectId(domainFeed.getId()),
            name: domainFeed.getName(),
            url: domainFeed.getUrl(),
            selectors: domainFeed.getSelectors(),
        });
    }

}