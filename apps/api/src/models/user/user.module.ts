import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProviderService } from 'src/models/provider/provider.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ProviderService],
})
export class UserModule { }
