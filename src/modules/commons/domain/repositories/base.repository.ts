import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { getModelForClass } from '@typegoose/typegoose';
import { ReturnModelType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import { Document } from 'mongoose';
import { Optional } from "typescript-optional";
import { injectable } from "inversify";
import { MapperInterface } from "../mapper/mapper.interface";

@injectable()
export abstract class BaseRepository<Entity, Domain, SchemaModel extends Base> {
    protected model!: ReturnModelType<new() => Document, BeAnObject>;
    protected mapper!: MapperInterface<Entity, Domain, SchemaModel>;

    protected setModel(model: new() => Document) {
        this.model = getModelForClass(model);
    }

    protected setMapper(mapper: MapperInterface<Entity, Domain, SchemaModel>) {
        this.mapper = mapper;
    }

    protected async getAll(): Promise<Domain[]> {
        return this.mapper.toDomains((await this.model.find().exec()) as Entity[]);
    }

    protected async getDetail(id: string): Promise<Optional<Domain>> {
        return this.mapper.toDomain(await this.model.findById(id).exec() as Entity);
    }

    protected async create(item: Domain): Promise<Optional<Domain>> {
        const newItem = new this.model(this.mapper.toSchema(item));
        const document = await newItem.save();
        return this.mapper.toDomain(document as Entity);
    }

    protected async delete(id: string): Promise<Optional<Domain>> {
        const document = await this.model.findByIdAndRemove(id).exec();
        return this.mapper.toDomain(document as Entity);
    }

    protected async getDatailAndUpdate(id: string, item: Domain): Promise<Optional<Domain>> {
        const document = await this.model
            .findByIdAndUpdate(id, item as any, { new: true }).exec();
        return this.mapper.toDomain(document as Entity);
    }
}