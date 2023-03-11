import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional,  } from "class-validator";
import { TypeAccount,  StatusAccount } from "@prisma/client";
import { Transform } from "class-transformer";


export class FilterAccountDTO {

    @IsOptional()
    name?: string;

    @IsOptional()
    @Transform((params) => (params.value === '' ? undefined : parseInt(params.value)))    
    dayDueDate?: number;

    
    @Transform((params) => (params.value === '' ? undefined : params.value))
    @IsOptional()
    @IsEnum(TypeAccount)
    type?: TypeAccount;

    @Transform((params) => (params.value === '' ? undefined : params.value))
    @IsOptional()
    @IsEnum(StatusAccount)
    status?: StatusAccount;


    @IsOptional()
    groupId?: string;
}