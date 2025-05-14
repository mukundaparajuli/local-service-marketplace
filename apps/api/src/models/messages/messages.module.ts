import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ConversationsService } from './conversations.service';

@Module({
  providers: [MessagesGateway, MessagesService, ConversationsService, PrismaService],
})
export class MessagesModule { }
