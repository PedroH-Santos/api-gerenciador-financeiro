import { StatusRegister } from "@prisma/client";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export class FilterGroupsDTO {

    @IsOptional()
    name?: string;

    @IsOptional()
    code?: string;


}