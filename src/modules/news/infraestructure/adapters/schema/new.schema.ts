import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Types, Document } from 'mongoose';
import { NewSelectorsInterface } from "../../../domain/interface/new-selectors.interface";
@modelOptions({ schemaOptions: { collection: 'feeds'}, options: { allowMixed: Severity.ALLOW} })
export class NewDocument extends Document {
    @prop()
    _id!: Types.ObjectId;

    @prop()
    id!: string;

    @prop({ required: true })
    name!: string;

    @prop({ required: true })
    url!: string;

    @prop({ required: true })
    selectors!: NewSelectorsInterface
}

export const NewModel = getModelForClass(NewDocument);
