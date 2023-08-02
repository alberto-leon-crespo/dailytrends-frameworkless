import { Document } from 'mongoose';

export interface NewEntity extends Document {
    id: string;
    author: string;
    title: string;
    link: string;
    feed_id: string;
}