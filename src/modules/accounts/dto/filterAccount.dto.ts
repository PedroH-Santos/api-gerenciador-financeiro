import { IsDate, IsDateString, IsEnum, IsOptional } from "class-validator";
import { TypeAccount, OriginAccount, StatusAccount } from "@prisma/client";


export class FilterAccountDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    @IsDateString()
    dueDate: string;

    @IsOptional()
    @IsEnum(TypeAccount)
    type: TypeAccount;

    @IsOptional()
    @IsEnum(OriginAccount)
    origin: OriginAccount;

    @IsOptional()
    @IsEnum(StatusAccount)
    status: StatusAccount;



}