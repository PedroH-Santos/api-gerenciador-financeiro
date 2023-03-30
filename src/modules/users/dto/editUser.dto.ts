import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from "class-validator";



export class EditUserDTO {



    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    image?: string;
}