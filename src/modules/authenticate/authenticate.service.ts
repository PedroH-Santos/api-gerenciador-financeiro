import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { configAuth } from "src/config/auth.config";
import { LoginDTO } from "./dto/login.dto";
import { Users } from "@prisma/client";


@Injectable()
export class AuthenticateService {
    constructor(private usersRepository: UsersRepository,private jwtService: JwtService){}

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

        return { userId: user.id, username: user.name };


    }

    async login(data: any){
        const token = this.jwtService.sign(
            { 
                name: data.name, 
                id: data.id, 
                email: data.email
            },
            {
                secret: configAuth.secret,
                expiresIn: configAuth.expiresIn
            }
        )

        return {
            access_token: token,
        };
    }

}