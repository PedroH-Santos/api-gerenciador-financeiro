import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { configAuth } from 'src/config/auth.config';
import { PayloadTokenDTO } from '../dto/payloadToken.dto';
import { UserTokenDTO } from '../dto/userToken.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configAuth.token_secret,
        });
    }

    async validate(payload: PayloadTokenDTO): Promise<UserTokenDTO> {
        return {
            userId: payload.sub,
            userName: payload.username,
        };
    }
}