import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TypeAccount,OriginAccount,StatusAccount } from "@prisma/client";


export class CreateAccountDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsDate()
    dueDate: string;

    @IsNotEmpty()
    @IsEnum(TypeAccount)
    type: TypeAccount;

    @IsNotEmpty()
    @IsEnum(OriginAccount)
    origin: OriginAccount;

    @IsNotEmpty()
    installments: number;

    @IsNotEmpty()
    @IsEnum(StatusAccount)
    status: StatusAccount;



}