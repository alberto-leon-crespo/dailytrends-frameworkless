import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { ReturnModelType } from "@typegoose/typegoose";
import { DomainFeed } from "../../../feeds/domain/domain.feed";
import { MapperInterface } from '../mapper/mapper.interface'
import { FeedDocument } from "../../../feeds/infraestructure/adapters/schema/feed.schema";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import {FeedMapperService} from "../../../feeds/domain/services/feed.mapper.service";
import {FeedEntity} from "../../../feeds/infraestructure/entity/feed.entity";
import { Optional } from "typescript-optional";

export abstract class BaseRepository<DomainEntity, SchemaModel extends Base> {
    protected model: ReturnModelType<new() => FeedDocument, BeAnObject>;
    protected mapper: FeedMapperService;

    constructor(model: new() => FeedDocument, mapper: FeedMapperService) {
        this.model = getModelForClass(model);
        this.mapper = mapper;
    }

    async getAll(): Promise<DomainFeed[]> {
        return this.mapper.toDomains(await this.model.find().exec());
    }

    async getDetail(id: string): Promise<Optional<DomainFeed>> {
        return this.mapper.toDomain(await this.model.findById(id).exec() as FeedEntity);
    }

    async create(item: DomainFeed): Promise<Optional<DomainFeed>> {
        const newItem = new this.model(item);
        const document = await newItem.save();
        return this.mapper.toDomain(document);
    }

    async delete(id: string): Promise<Optional<DomainFeed>> {
        const document = await this.model.findByIdAndRemove(id).exec();
        return this.mapper.toDomain(document as FeedEntity);
    }

    async updateDocument(id: string, item: DomainFeed): Promise<Optional<DomainFeed>> {
        const document = await this.model
            .findByIdAndUpdate(id, item, { new: true }).exec();
        return this.mapper.toDomain(document as FeedEntity);
    }
}