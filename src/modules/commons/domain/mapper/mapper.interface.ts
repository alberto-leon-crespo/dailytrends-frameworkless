import {Base} from "@typegoose/typegoose/lib/defaultClasses";
import {FeedEntity} from "../../../feeds/infraestructure/entity/feed.entity";
import {Optional} from "typescript-optional";
import {DomainFeed} from "../../../feeds/domain/domain.feed";

export interface MapperInterface<DomainEntity, SchemaModel> {
    toDomain(feedEntity: FeedEntity): Optional<DomainFeed>;
    toDomains(feedEntities: FeedEntity[]): DomainFeed[];
}