import { Document } from 'mongoose';

export interface FeedEntity extends Document {
    id: string;
    name: string;
    url: string;
}