import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { GroupController } from './groups.controller';
import { GroupRepository } from './groups.repository';
import { GroupsMembersRepository } from '../groupsMembers/groupsMembers.repository';


@Module({
    controllers: [GroupController],
    providers: [GroupRepository, GroupsMembersRepository,PrismaService],
    exports: [GroupRepository]

})
export class GroupsModule { }
