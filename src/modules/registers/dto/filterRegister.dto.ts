import { StatusRegister } from "@prisma/client";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export class FilterRegisterDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    @IsDateString()
    createdAt: string;




}