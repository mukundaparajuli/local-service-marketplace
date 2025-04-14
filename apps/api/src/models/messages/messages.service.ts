import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@Injectable()
export class MessagesService {
  private logger = new Logger(MessagesService.name)
  constructor(private prisma: PrismaService) { }

  async create(createMessageDto: CreateMessageDto) {
    this.logger.log(createMessageDto.content);
    const message = await this.prisma.message.create({
      data: createMessageDto
    })
    this.logger.log("Message created successfully", message);
    return message;
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: string) {
    return `This action returns a #${id} message`;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
