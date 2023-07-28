import { getModelForClass } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { Types } from 'mongoose';
import { MapperInterface } from "../../../commons/domain/mapper/mapper.interface";
import { DomainFeed } from "../domain.feed";
import { FeedDocument } from "../../infraestructure/adapters/schema/feed.schema";

@injectable()
export class FeedMapperService implements MapperInterface<DomainFeed, FeedDocument> {
    private feedModel;

    constructor() {
        this.feedModel = getModelForClass(FeedDocument);
    }

    mapToDomain(feedSchema: FeedDocument): DomainFeed {
        return new DomainFeed(feedSchema._id.toString(), feedSchema.name, feedSchema.url);
    }

    mapToDocument(domainFeed: DomainFeed): FeedDocument {
        const feedDocument = new FeedDocument();
        feedDocument._id = new Types.ObjectId(domainFeed.getId()),
        feedDocument.id = domainFeed.getId(),
        feedDocument.name = domainFeed.getName(),
        feedDocument.url = domainFeed.getUrl()
        return feedDocument;
    }
}