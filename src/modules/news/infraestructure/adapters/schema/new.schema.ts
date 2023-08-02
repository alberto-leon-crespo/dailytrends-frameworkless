import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Types, Document } from 'mongoose';
@modelOptions({ schemaOptions: { collection: 'news'}, options: { allowMixed: Severity.ALLOW} })
export class NewDocument extends Document {
    @prop()
    _id!: Types.ObjectId;

    @prop()
    id!: string;

    @prop({ required: true })
    author!: string;

    @prop({ required: true })
    title!: string;

    @prop({ required: true })
    link!: string;

    @prop({ required: true })
    // tslint:disable-next-line:variable-name
    feed_id!: Types.ObjectId;
}

export const NewModel = getModelForClass(NewDocument);
