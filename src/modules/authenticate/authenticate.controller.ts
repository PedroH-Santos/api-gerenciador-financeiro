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
        const token = this.authenticateService.login(req.user);
        return token;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @UseGuards(RefreshTokenGuard)
    @Get('/refresh')
    getRefreshToken(@Request() req: any  ) {
        const tokens = this.authenticateService.refreshToken(req.user);
        return tokens;
    }
}