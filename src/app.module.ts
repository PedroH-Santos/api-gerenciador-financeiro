import { Module } from '@nestjs/common';
import { RegistersModule } from './modules/registers/registers.module';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { GroupsModule } from './modules/groups/groups.module';
import { AuthenticateModule } from './modules/authenticate/authenticate.module';
import { GroupsMembersModule } from './modules/groupsMembers/groupsMembers.module';
import { AccountsRegistersModule } from './modules/accountsRegisters/accountsRegisters.module';

@Module({
  imports: [UsersModule, RegistersModule, AccountsModule, GroupsModule, AuthenticateModule, GroupsMembersModule, AccountsRegistersModule],
})
export class AppModule {} 
