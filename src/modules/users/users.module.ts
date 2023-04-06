import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/service/prisma.service';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository,UsersService,PrismaService],
  exports: [UsersRepository,UsersService]
})
export class UsersModule {}
