import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNewDto {
    @IsOptional()
    _id!: string;

    @IsNotEmpty()
    author!: string;

    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    link!: string;

    @IsNotEmpty()
    // tslint:disable-next-line:variable-name
    feed_id!: string;
}
