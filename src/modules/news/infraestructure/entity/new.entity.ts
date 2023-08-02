import { Document } from 'mongoose';
import { NewSelectorsInterface } from "../../domain/interface/new-selectors.interface";

export interface NewEntity extends Document {
    id: string;
    name: string;
    url: string;
    selectors: NewSelectorsInterface;
}