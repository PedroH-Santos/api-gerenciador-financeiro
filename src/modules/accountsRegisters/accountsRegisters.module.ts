import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AccountsRegistersController } from './accountsRegisters.controller';
import { AccountRegistersRepository } from './accountsRegisters.repository';
import { AccountsRegistersService } from './accountsRegisters.service';
import { GroupsMembersModule } from '../groupsMembers/groupsMembers.module';
import { GroupsModule } from '../groups/groups.module';
import { AccountsModule } from '../accounts/accounts.module';


@Module({
  controllers: [AccountsRegistersController],
  providers: [AccountRegistersRepository, AccountsRegistersService, PrismaService],
  exports: [AccountRegistersRepository, AccountsRegistersService],
  imports: [AccountsModule, GroupsModule, GroupsMembersModule]
})
export class AccountsRegistersModule {}
