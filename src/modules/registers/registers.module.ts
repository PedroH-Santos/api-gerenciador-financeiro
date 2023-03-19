import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { RegisterController } from './registers.controller';
import { RegistersRepository } from './registers.repository';
import { RegisterFilterController } from './registerFilter.controller';

@Module({
    controllers: [RegisterController, RegisterFilterController],
    providers: [RegistersRepository, PrismaService],
})
export class RegistersModule { }
