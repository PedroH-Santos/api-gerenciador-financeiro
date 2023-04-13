import { StatusAccount } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional } from "class-validator";



export class EditAccountDTO {

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;
    
    @IsOptional()
    @IsEnum(StatusAccount)
    status?: StatusAccount;
}