import { StatusRegister } from "@prisma/client";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export class EditGroupDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    creatorId: string;


}