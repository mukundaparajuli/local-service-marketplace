import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ConversationsService {
    private readonly logger = new Logger(ConversationsService.name);

    constructor(private prisma: PrismaService) { }

    async createConversation(userIds: number[], bookingId?: number) {
        this.logger.log(`Creating conversation for users: ${userIds.join(', ')}`);

        const conversation = await this.prisma.conversation.create({
            data: {
                participants: {
                    connect: userIds.map(id => ({ id }))
                },
                bookingId,
            },
            include: {
                participants: {
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

        this.logger.log(`Conversation created with ID: ${conversation.id}`);
        return conversation;
    }

    async findOrCreateConversation(userIds: number[], bookingId?: number) {
        this.logger.log(`Finding or creating conversation for users: ${userIds.join(', ')}`);
        // First try to find an existing conversation
        const existingConversation = await this.prisma.conversation.findFirst({
            where: {
                AND: [
                    {
                        participants: {
                            every: {
                                id: {
                                    in: userIds
                                }
                            }
                        }
                    },
                    {
                        participants: {
                            none: {
                                id: {
                                    notIn: userIds
                                }
                            }
                        }
                    },
                    bookingId ? { bookingId } : {}
                ]
            },
            include: {
                participants: {
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

        if (existingConversation) {
            return existingConversation;
        }

        // If no existing conversation found, create a new one
        return this.createConversation(userIds, bookingId);
    }

    async getConversation(id: number) {
        return this.prisma.conversation.findUnique({
            where: { id },
            include: {
                participants: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true
                    }
                },
                messages: {
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
                }
            }
        });
    }

    async getUserConversations(userId: number) {
        return this.prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                participants: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true
                    }
                },
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc'
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
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
} 