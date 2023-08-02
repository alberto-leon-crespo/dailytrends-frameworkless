import { getModelForClass } from '@typegoose/typegoose';
import { injectable } from 'inversify';
import { MapperInterface } from "../../../commons/domain/mapper/mapper.interface";
import { NewDomain } from "../new.domain";
import { NewDocument } from "../../infraestructure/adapters/schema/new.schema";
import { NewModel } from "../../infraestructure/adapters/schema/new.schema";
import { Optional } from "typescript-optional";
import { NewEntity } from "../../infraestructure/entity/new.entity";
import { Types } from "mongoose";

@injectable()
export class NewMapperService implements MapperInterface<NewEntity, NewDomain, NewDocument> {
    private feedModel;

    constructor() {
        this.feedModel = getModelForClass(NewDocument);
    }

    public toDomain(newEntity: NewEntity): Optional<NewDomain> {
        if (!newEntity) {
            return Optional.empty<NewDomain>();
        }
        const feed = new NewDomain(
            newEntity._id,
            newEntity.author,
            newEntity.title,
            newEntity.link,
            newEntity.feed_id,
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

    public toSchema(domainNew: NewDomain): NewDocument {
        return new NewModel({
            _id: new Types.ObjectId(domainNew.getId()),
            author: domainNew.getAuthor(),
            title: domainNew.getTitle(),
            link: domainNew.getLink(),
            feed_id: new Types.ObjectId(domainNew.getFeedId()),
        });
    }

}