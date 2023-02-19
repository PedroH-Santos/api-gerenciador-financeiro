import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { GroupController } from './groups.controller';
import { GroupRepository } from './groups.repository';


@Module({
    controllers: [GroupController],
    providers: [GroupRepository, PrismaService],
})
export class GroupsModule { }
