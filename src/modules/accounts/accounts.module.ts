import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/service/prisma.service';
import { AccountsController } from './accounts.controller';
import { AccountRepository } from './accounts.repository';

@Module({
  controllers: [AccountsController],
  providers: [AccountRepository,PrismaService],
})
export class AccountsModule {}
