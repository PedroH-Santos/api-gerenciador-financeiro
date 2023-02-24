import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/service/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository,PrismaService],
  exports: [UsersRepository]
})
export class UsersModule {}
