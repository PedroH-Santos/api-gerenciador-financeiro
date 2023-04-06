import { Module, forwardRef } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { GroupController } from './groups.controller';
import { GroupRepository } from './groups.repository';
import { GroupsMembersModule } from '../groupsMembers/groupsMembers.module';
import { GroupsService } from './groups.service';


@Module({
    controllers: [GroupController],
    providers: [GroupRepository, GroupsService, PrismaService],
    exports: [GroupRepository],
    imports: [forwardRef(() => GroupsMembersModule) ]

})
export class GroupsModule { }
