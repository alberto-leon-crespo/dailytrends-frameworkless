import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Types, Document } from 'mongoose';
@modelOptions({ schemaOptions: { collection: 'feeds',  } })
export class FeedDocument extends Document {
    @prop()
    _id!: Types.ObjectId;

    @prop()
    id!: string;

    @prop({ required: true })
    name!: string;

    @prop({ required: true })
    url!: string;
}

export const FeedModel = getModelForClass(FeedDocument);
