import { Global, Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';

import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configAuth } from 'src/config/auth.config';
import { LocalStrategy } from './strategies/auth.strategy';
import { JwtStrategy } from './strategies/token.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AuthenticateRepository } from './authenticate.repository';

@Global()
@Module({
    imports: [
        UsersModule, 
        PassportModule,
        JwtModule.register({})],
    controllers: [AuthenticateController],
    providers: [AuthenticateService, LocalStrategy, JwtStrategy,RefreshTokenStrategy, UsersRepository, PrismaService, AuthenticateRepository],
   
})
export class AuthenticateModule { }
