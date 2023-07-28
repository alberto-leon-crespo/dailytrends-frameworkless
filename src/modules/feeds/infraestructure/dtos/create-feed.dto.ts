import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFeedDto {
    @IsOptional()
    _id!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    url!: string;
}
