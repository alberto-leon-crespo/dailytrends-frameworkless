import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Types, Document } from 'mongoose';
import { FeedSelectorsInterface } from "../../../domain/interface/feed-selectors.interface";
@modelOptions({ schemaOptions: { collection: 'feeds'}, options: { allowMixed: Severity.ALLOW} })
export class FeedDocument extends Document {
    @prop()
    _id!: Types.ObjectId;

    @prop()
    id!: string;

    @prop({ required: true })
    name!: string;

    @prop({ required: true })
    url!: string;

    @prop({ required: true })
    selectors!: FeedSelectorsInterface
}

export const FeedModel = getModelForClass(FeedDocument);
