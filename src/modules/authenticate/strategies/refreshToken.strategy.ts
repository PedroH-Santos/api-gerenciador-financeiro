import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { configAuth } from 'src/config/auth.config';
import { PayloadTokenDTO } from '../dto/payloadToken.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configAuth.refresh_token_secret,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: PayloadTokenDTO): PayloadTokenDTO {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return { ...payload, refreshToken };
    }
}