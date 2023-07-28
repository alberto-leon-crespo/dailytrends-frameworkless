import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Types, Document } from 'mongoose';
@modelOptions({ schemaOptions: { collection: 'feeds' } })
export class FeedDocument extends Document {
    @prop({ required: true })
    _id!: Types.ObjectId;

    @prop({ required: true })
    id!: string;

    @prop()
    name!: string;

    @prop()
    url!: string;
}

export const FeedModel = getModelForClass(FeedDocument);
