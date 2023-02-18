import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { RegisterController } from './registers.controller';
import { RegistersRepository } from './registers.repository';

@Module({
    controllers: [RegisterController],
    providers: [RegistersRepository, PrismaService],
})
export class RegistersModule { }
