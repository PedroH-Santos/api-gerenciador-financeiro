import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { JwtService } from "@nestjs/jwt";
import { configAuth } from "src/config/auth.config";
import { AuthenticateRepository } from "./authenticate.repository";
import { compare } from "bcryptjs";



@Injectable()
export class AuthenticateService {
    constructor(private usersRepository: UsersRepository,private authenticateRepository: AuthenticateRepository,private jwtService: JwtService){}

    async validate(username: string, password: string): Promise<any> {
        const email = username;
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            return null;
        }

        const passwordMatch = compare(password, user.password);
        if (!passwordMatch){
            return null;
        }

        return { userId: user.id, userEmail: user.email, userName: user.name };


    }

    async login(user: any){
        const payload = {    
            sub: user.userId,
            username: user.userEmail
        }
        const tokens = await this.createTokens(payload);


        this.authenticateRepository.create(user.userId, tokens.refreshToken);

        return {
            access_token: tokens.token,
            refresh_token: tokens.refreshToken,
        };
    }

    async createTokens(payload: any){
        return {
            token: this.jwtService.sign(payload, {
                secret: configAuth.token_secret,
                expiresIn: configAuth.token_expiresIn
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: configAuth.refresh_token_expiresIn,
                expiresIn: configAuth.refresh_token_expiresIn
            })
        } 
    }
    async refreshToken(user: any){
        const {refreshToken, sub, username} = user;
        const userExists = this.usersRepository.findByEmail(username);
        if(!userExists){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        const tokenFind = await this.authenticateRepository.findOneByUserId(sub);
        if (!tokenFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Token não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        if (!compare(tokenFind.refreshToken,refreshToken)){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Token não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const tokens = await this.createTokens(user);

        this.authenticateRepository.edit(sub,tokens.refreshToken);

        return {
            access_token: tokens.token,
            refresh_token: tokens.refreshToken,
        };


    }

}