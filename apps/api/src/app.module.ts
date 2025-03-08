import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/prisma/prisma.service';

@Module({
  imports: [AuthModule, PrismaService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
