import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { GroupsMembersRepository } from './groupsMembers.repository';
import { GroupsMembersController } from './groupsMembers.controller';
import { GroupRepository } from '../groups/groups.repository';



@Module({
    controllers: [GroupsMembersController],
    providers: [GroupsMembersRepository, GroupRepository,PrismaService],
})
export class GroupsMembersModule { }
