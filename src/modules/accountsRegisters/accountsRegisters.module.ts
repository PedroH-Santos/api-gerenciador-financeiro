import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AccountsRegistersController } from './accountsRegisters.controller';
import { AccountRegistersRepository } from './accountsRegisters.repository';
import { AccountRepository } from '../accounts/accounts.repository';


@Module({
  controllers: [AccountsRegistersController],
  providers: [AccountRegistersRepository,AccountRepository,PrismaService],
})
export class AccountsRegistersModule {}
