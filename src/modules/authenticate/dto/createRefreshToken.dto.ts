import { IsNotEmpty } from "class-validator";

export class CreateRefreshTokenDTO {
    @IsNotEmpty()
    userId: string;
    @IsNotEmpty()
    refreshToken: string;

} 