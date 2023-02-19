import { StatusRegister } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";



export class CreateGroupDTO {

    @IsNotEmpty()
    name: string;



}