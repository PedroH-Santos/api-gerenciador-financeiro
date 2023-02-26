import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";
import { TypeAccount, StatusAccount } from "@prisma/client";


export class EditAccountsRegistersDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsDateString()
    dueDate: string;

    @IsOptional()
    installments: number;

    @IsOptional()
    @IsEnum(StatusAccount)
    status: StatusAccount;

    @IsOptional()
    accountId: string;

}