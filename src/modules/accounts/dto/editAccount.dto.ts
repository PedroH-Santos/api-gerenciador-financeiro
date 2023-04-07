import { IsNumber, IsOptional } from "class-validator";



export class EditAccountDTO {

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

}