import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { RegisterController } from './registers.controller';
import { RegistersRepository } from './registers.repository';
import { RegistersService } from './registers.service';

@Module({
    controllers: [RegisterController],
    providers: [RegistersRepository,RegistersService, PrismaService],
    exports: [RegistersRepository,RegistersService]
})
export class RegistersModule { }
