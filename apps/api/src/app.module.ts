import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/prisma/prisma.service';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './models/service/service.module';
import { ProviderModule } from './models/provider/provider.module';
import { BookingModule } from './models/booking/booking.module';
import { MessagesModule } from './models/messages/messages.module';

@Module({
  imports: [AuthModule, PrismaService, UserModule, ConfigModule.forRoot(), ServiceModule, ProviderModule, BookingModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
