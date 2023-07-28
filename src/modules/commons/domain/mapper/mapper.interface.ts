import {Base} from "@typegoose/typegoose/lib/defaultClasses";

export interface MapperInterface<DomainEntity, SchemaModel> {
    mapToDomain(input: SchemaModel): DomainEntity;
    mapToDocument(input: DomainEntity): SchemaModel;
}