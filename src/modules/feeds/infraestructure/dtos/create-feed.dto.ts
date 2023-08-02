import { IsNotEmpty, IsOptional } from 'class-validator';
import { FeedSelectorsInterface } from "../../domain/interface/feed-selectors.interface";

export class CreateFeedDto {
    @IsOptional()
    _id!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    url!: string;

    @IsNotEmpty()
    selectors!: FeedSelectorsInterface;
}
