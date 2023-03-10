import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TypeAccount,StatusAccount } from "@prisma/client";


export class CreateAccountDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    dayDueDate: number;

    @IsNotEmpty()
    @IsEnum(TypeAccount)
    type: TypeAccount;

    @IsNotEmpty()
    installments: number;

    @IsNotEmpty()
    @IsEnum(StatusAccount)
    status: StatusAccount;

    @IsNotEmpty()
    groupId: string;


}