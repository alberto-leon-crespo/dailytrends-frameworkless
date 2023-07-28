import {Optional} from "typescript-optional";
import {FeedDomain} from "../../../feeds/domain/feed.domain";

export interface MapperInterface<Entity, DomainEntity, SchemaModel> {
    toDomain(entity: Entity): Optional<DomainEntity>;
    toDomains(entity: Entity[]): DomainEntity[];
    toSchema(feedDocument: DomainEntity): SchemaModel;
}