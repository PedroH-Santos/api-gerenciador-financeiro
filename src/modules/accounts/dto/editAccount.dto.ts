import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { TypeAccount, OriginAccount, StatusAccount } from "@prisma/client";


export class EditAccountDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsDate()
    dueDate: string;

    @IsOptional()
    @IsEnum(TypeAccount)
    type: TypeAccount;

    @IsOptional()
    @IsEnum(OriginAccount)
    origin: OriginAccount;

    @IsOptional()
    installments: number;

    @IsOptional()
    @IsEnum(StatusAccount)
    status: StatusAccount;



}