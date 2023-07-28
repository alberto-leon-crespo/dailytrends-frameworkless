import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { ReturnModelType } from "@typegoose/typegoose";
import { DomainFeed } from "../../../feeds/domain/domain.feed";
import { MapperInterface } from '../mapper/mapper.interface'
import { FeedDocument } from "../../../feeds/infraestructure/adapters/schema/feed.schema";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import {FeedMapperService} from "../../../feeds/domain/services/feed.mapper.service";

export abstract class BaseRepository<DomainEntity, SchemaModel extends Base> {
    protected model: ReturnModelType<new() => FeedDocument, BeAnObject>;
    protected mapper: FeedMapperService;

    constructor(model: new() => FeedDocument, mapper: FeedMapperService) {
        this.model = getModelForClass(model);
        this.mapper = mapper;
    }

    async getAll(): Promise<DomainFeed[]> {
        const feeds: DomainFeed[] = [];
        const documents = await this.model.find().exec();
        for (const document of documents) {
            feeds.push(this.mapper.mapToDomain(document as unknown as DocumentType<FeedDocument>));
        }
        return feeds;
    }

    async getDetail(id: string): Promise<DomainFeed> {
        const document = await this.model.findById(id).exec();
        return this.mapper.mapToDomain(document as unknown as DocumentType<FeedDocument>);
    }

    async create(item: DomainFeed): Promise<DomainFeed> {
        const newItem = new this.model(item);
        const document = await newItem.save();
        return this.mapper.mapToDomain(document as unknown as DocumentType<FeedDocument>);
    }

    async delete(id: string): Promise<DomainFeed> {
        const document = await this.model.findByIdAndRemove(id).exec();
        return this.mapper.mapToDomain(document as unknown as DocumentType<FeedDocument>);
    }

    async updateDocument(id: string, item: DomainFeed): Promise<DomainFeed> {
        const document = await this.model
            .findByIdAndUpdate(id, item, { new: true }).exec();
        return this.mapper.mapToDomain(document as unknown as DocumentType<FeedDocument>);
    }
}