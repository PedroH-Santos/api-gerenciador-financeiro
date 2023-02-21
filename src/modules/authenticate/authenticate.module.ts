import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configAuth } from 'src/config/auth.config';
@Module({
    imports: [
        UsersModule, 
        PassportModule,
        JwtModule.register({
            secret: configAuth.secret,
            signOptions: { expiresIn: configAuth.expiresIn },
        })],
    controllers: [AuthenticateController],
    providers: [AuthenticateService, LocalStrategy, JwtStrategy, UsersRepository, PrismaService],
})
export class AuthenticateModule { }
