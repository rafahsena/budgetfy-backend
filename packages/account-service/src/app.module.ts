import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
