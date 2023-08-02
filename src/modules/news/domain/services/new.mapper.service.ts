import { getModelForClass } from '@typegoose/typegoose';
import { injectable } from 'inversify';
import { MapperInterface } from "../../../commons/domain/mapper/mapper.interface";
import { NewDomain } from "../new.domain";
import { FeedDocument } from "../../infraestructure/adapters/schema/feed.schema";
import { FeedModel } from "../../infraestructure/adapters/schema/feed.schema";
import { Optional } from "typescript-optional";
import { NewEntity } from "../../infraestructure/entity/new.entity";
import { Types } from "mongoose";

@injectable()
export class NewMapperService implements MapperInterface<NewEntity, NewDomain, FeedDocument> {
    private feedModel;

    constructor() {
        this.feedModel = getModelForClass(FeedDocument);
    }

    public toDomain(feedEntity: NewEntity): Optional<NewDomain> {
        if (!feedEntity) {
            return Optional.empty<NewDomain>();
        }
        const feed = new NewDomain(
            feedEntity._id,
            feedEntity.name,
            feedEntity.url,
            feedEntity.selectors,
        );
        return Optional.of(feed);
    }

    public toDomains(feedEntities: NewEntity[]): NewDomain[] {
        const feeds = new Array<NewDomain>();
        feedEntities.forEach((feedEntity) => {
            const feed = this.toDomain(feedEntity);
            feeds.push(feed.get());
        });
        return feeds;
    }

    public toSchema(domainFeed: NewDomain): FeedDocument {
        return new FeedModel({
            _id: new Types.ObjectId(domainFeed.getId()),
            name: domainFeed.getName(),
            url: domainFeed.getUrl(),
            selectors: domainFeed.getSelectors(),
        });
    }

}