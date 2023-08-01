import { Document } from 'mongoose';
import { FeedSelectorsInterface } from "../../domain/interface/feed-selectors.interface";

export interface FeedEntity extends Document {
    id: string;
    name: string;
    url: string;
    selectors: FeedSelectorsInterface;
}