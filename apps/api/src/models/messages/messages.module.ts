import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ConversationsController],
  providers: [MessagesGateway, MessagesService, ConversationsService, PrismaService, JwtService],
})
export class MessagesModule { }
