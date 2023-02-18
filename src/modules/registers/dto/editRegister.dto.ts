import { StatusRegister } from "@prisma/client";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export class EditRegisterDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsEnum(StatusRegister)
    status: StatusRegister;

}