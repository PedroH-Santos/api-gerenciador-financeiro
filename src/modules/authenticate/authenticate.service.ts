import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { configAuth } from "src/config/auth.config";



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

        return { userId: user.id, userEmail: user.email, userName: user.name };


    }

    async login(user: any){
        const payload = {    
            sub: user.userId,
            username: user.userEmail
        }
        
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
        };
    }

}