import { Module, forwardRef } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { GroupsMembersRepository } from './groupsMembers.repository';
import { GroupsMembersController } from './groupsMembers.controller';
import { GroupsModule } from '../groups/groups.module';
import { GroupsMembersService } from './groupsMembers.service';



@Module({
    controllers: [GroupsMembersController],
    providers: [GroupsMembersRepository,GroupsMembersService,PrismaService],
    exports: [GroupsMembersRepository, GroupsMembersService],
    imports: [forwardRef(() => GroupsModule)]
})
export class GroupsMembersModule { }
