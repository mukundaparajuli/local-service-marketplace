import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MessagesService {
  private logger = new Logger(MessagesService.name)
  constructor(private prisma: PrismaService) { }

  async create(createMessageDto: CreateMessageDto) {
    this.logger.log(`Creating message: ${createMessageDto.content}`);
    const message = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        receiverId: createMessageDto.receiverId,
        bookingId: createMessageDto.bookingId,
        conversationId: createMessageDto.conversationId
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      }
    });
    this.logger.log("Message created successfully", message);
    return message;
  }

  async findAll() {
    return this.prisma.message.findMany({
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      }
    });
  }

  async findMessagesBetweenUsers(userId1: number, userId2: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: userId1 },
              { receiverId: userId2 }
            ]
          },
          {
            AND: [
              { senderId: userId2 },
              { receiverId: userId1 }
            ]
          }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      }
    });
  }

  async remove(id: string) {
    return this.prisma.message.delete({
      where: { id }
    });
  }

  async markMessagesAsRead(senderId: number, receiverId: number) {
    return this.prisma.message.updateMany({
      where: {
        senderId,
        receiverId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });
  }
}
