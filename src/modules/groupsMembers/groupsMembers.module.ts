import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { GroupsMembersRepository } from './groupsMembers.repository';
import { GroupsMembersController } from './groupsMembers.controller';



@Module({
    controllers: [GroupsMembersController],
    providers: [GroupsMembersRepository, PrismaService],
})
export class GroupsMembersModule { }
