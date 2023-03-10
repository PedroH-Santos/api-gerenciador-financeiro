import { IsNotEmpty } from "class-validator";


export class OutGroupDTO {
    @IsNotEmpty()
    code: string;
}