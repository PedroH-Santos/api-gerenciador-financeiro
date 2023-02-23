import {  Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthenticateService } from "./authenticate.service";
import { LocalAuthGuard } from "./strategies/local.guard";
import { JwtAuthGuard } from "./strategies/jwt.guard";


@Controller("/login")
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService) {
    
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
        const token = this.authenticateService.login(req.user);
        return token;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}