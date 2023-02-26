import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TypeAccount,StatusAccount } from "@prisma/client";


export class CreateAccountsRegistersDTO {


    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsDateString()
    dueDate: string;

    @IsNotEmpty()
    @IsNumber()
    installments: number;


    
    @IsNotEmpty()
    accountId: string;


}