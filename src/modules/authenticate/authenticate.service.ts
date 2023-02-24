import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { JwtService } from "@nestjs/jwt";
import { configAuth } from "src/config/auth.config";
import { AuthenticateRepository } from "./authenticate.repository";
import { compare } from "bcryptjs";
import { PayloadTokenDTO } from "./dto/payloadToken.dto";
import { UserTokenDTO } from "./dto/userToken.dto";



@Injectable()
export class AuthenticateService {
    constructor(private usersRepository: UsersRepository,private authenticateRepository: AuthenticateRepository,private jwtService: JwtService){}

    async validate(username: string, password: string): Promise<UserTokenDTO> {
        const email = username;
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            return null;
        }

        const passwordMatch = compare(password, user.password);
        if (!passwordMatch){
            return null;
        }

        return { userId: user.id, userName: user.email};


    }

    async login(user: UserTokenDTO){
        const payload: PayloadTokenDTO = {    
            sub: user.userId,
            username: user.userName
        }
        const tokens = await this.createTokens(payload);

        const tokenFind = await this.authenticateRepository.findOneByUserId(user.userId);
        if (!tokenFind) {
            this.authenticateRepository.create(user.userId, tokens.refreshToken);
        }else {
            this.authenticateRepository.edit(user.userId, tokens.refreshToken);
        }

        

        return {
            access_token: tokens.token,
            refresh_token: tokens.refreshToken,
        };
    }

    async createTokens(payload: PayloadTokenDTO){
        return {
            token: this.jwtService.sign(payload, {
                secret: configAuth.token_secret,
                expiresIn: configAuth.token_expiresIn
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: configAuth.refresh_token_secret,
                expiresIn: configAuth.refresh_token_expiresIn
            })
        } 
    }
    async refreshToken(payload: PayloadTokenDTO){
        const { refreshToken, sub, username } = payload;
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
        const tokens = await this.createTokens({ sub, username });

        this.authenticateRepository.edit(sub,tokens.refreshToken);

        return {
            access_token: tokens.token,
            refresh_token: tokens.refreshToken,
        };


    }

}