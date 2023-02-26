import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";
import { TypeAccount,  StatusAccount } from "@prisma/client";


export class FilterAccountDTO {

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsNumber()
    dayDueDate?: number;

    @IsOptional()
    @IsEnum(TypeAccount)
    type?: TypeAccount;


    @IsOptional()
    @IsEnum(StatusAccount)
    status?: StatusAccount;


    @IsOptional()
    groupId?: string;
}