
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticateService } from '../authenticate.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticateService: AuthenticateService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authenticateService.validate(username, password);
        if(!user) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário ou Senha Incorreta'
            }, HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}