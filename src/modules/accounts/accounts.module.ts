import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AccountsController } from './accounts.controller';
import { AccountRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountRepository,AccountsService,PrismaService],
  exports: [AccountRepository,AccountsService]
})
export class AccountsModule {}
