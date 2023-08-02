import { IsNotEmpty, IsOptional } from 'class-validator';
import { NewSelectorsInterface } from "../../domain/interface/new-selectors.interface";

export class CreateNewDto {
    @IsOptional()
    _id!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    url!: string;

    @IsNotEmpty()
    selectors!: NewSelectorsInterface;
}
