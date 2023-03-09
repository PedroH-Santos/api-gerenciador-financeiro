import {  Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthenticateService } from "./authenticate.service";
import { JwtAuthGuard } from "./strategies/token.guard";
import { LocalAuthGuard } from "./strategies/auth.guard";
import { RefreshTokenGuard } from "./strategies/refreshToken.guard";



@Controller("/login")
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService) {
    
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req: any) {
        const token = await this.authenticateService.login(req.user);
        return token;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Request() req: any) {
       const user = await this.authenticateService.getUserOfToken(req.user);
       return {
        user,
       };
    }

    @UseGuards(RefreshTokenGuard)
    @Get('/refresh')
    async getRefreshToken(@Request() req: any  ) {
        const tokens = await this.authenticateService.refreshToken(req.user);
        return tokens;
    }
}