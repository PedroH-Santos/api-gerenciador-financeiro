import { IsNotEmpty } from "class-validator";


export class JoinGroupDTO {
    @IsNotEmpty()
    groupId: string;
}