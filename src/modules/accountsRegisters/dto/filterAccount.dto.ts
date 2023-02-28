import { IsDate, IsDateString, IsEnum, IsOptional } from "class-validator";
import { TypeAccount,  StatusAccount } from "@prisma/client";


export class FilterAccountsRegistersDTO {

    @IsOptional()
    @IsDateString()
    dueDate?: string;

    @IsOptional()
    @IsEnum(StatusAccount)
    status?: StatusAccount[];

    @IsOptional()
    accountId?: string;
}