import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { AuthenticateService } from "./authenticate.service";
import { LocalAuthGuard } from "./strategies/local.guard";
import { JwtAuthGuard } from "./strategies/jwt.guard";


@Controller("/login")
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService) {
    
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Body() data: LoginDTO) {
        const token = this.authenticateService.login(data);
        return token;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}