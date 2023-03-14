import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AccountsRegistersController } from './accountsRegisters.controller';
import { AccountRegistersRepository } from './accountsRegisters.repository';
import { AccountRepository } from '../accounts/accounts.repository';
import { GroupRepository } from '../groups/groups.repository';
import { GroupsMembersRepository } from '../groupsMembers/groupsMembers.repository';


@Module({
  controllers: [AccountsRegistersController],
  providers: [AccountRegistersRepository, AccountRepository, PrismaService, GroupRepository, GroupsMembersRepository],
})
export class AccountsRegistersModule {}
