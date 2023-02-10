import { Module } from '@nestjs/common';
import { PrismaService } from './database/service/prisma.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
