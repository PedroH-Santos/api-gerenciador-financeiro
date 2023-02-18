import { StatusRegister } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";



export class CreateRegisterDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsEnum(StatusRegister)
    status: StatusRegister;


}