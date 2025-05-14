import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Logger } from '@nestjs/common';
import { JoinChatDto } from './dto/join-chat.dto';
import { ConversationsService } from './conversations.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MessagesGateway.name);
  private connectedClients: Map<string, number> = new Map(); // Map socket.id to userId

  constructor(
    private readonly messagesService: MessagesService,
    private readonly conversationsService: ConversationsService
  ) { }

  @WebSocketServer()
  io!: Server;

  afterInit() {
    this.logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`Number of connected clients: ${this.io.sockets.sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const userId = this.connectedClients.get(client.id);
    if (userId) {
      this.connectedClients.delete(client.id);
      this.logger.log(`User ${userId} disconnected`);
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody() joinChatDto: JoinChatDto,
    @ConnectedSocket() client: Socket
  ) {
    const { userId, bookingId } = joinChatDto;

    // Store userId in socket data for later use
    client.data.userId = userId;

    // Store the user's socket connection
    this.connectedClients.set(client.id, userId);

    // Find or create a conversation
    const conversation = await this.conversationsService.findOrCreateConversation(
      [userId, joinChatDto.userId],
      bookingId
    );

    // Create a room for the chat
    const chatId = [userId, joinChatDto.userId].sort().join('-');
    client.join(chatId);

    // Get conversation messages
    const messages = await this.messagesService.findMessagesBetweenUsers(userId, joinChatDto.userId);

    // Mark messages as read
    await this.messagesService.markMessagesAsRead(joinChatDto.userId, userId);

    this.logger.log(`User ${userId} joined chat with user ${joinChatDto.userId}`);

    // Emit previous messages to the client
    client.emit('previousMessages', messages);

    // Notify the other user
    this.io.to(chatId).emit('userJoined', {
      userId,
      chatId,
      conversation
    });

    return {
      status: "ok",
      chatId,
      conversation,
      messages
    };
  }

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Received message: `, createMessageDto);

    if (!createMessageDto.conversationId) {
      const conversation = await this.conversationsService.findOrCreateConversation(
        [createMessageDto.senderId, createMessageDto.receiverId],
        createMessageDto.bookingId
      );
      createMessageDto.conversationId = conversation.id;
      this.logger.log(`Created conversation id: `, createMessageDto.conversationId);
    }

    const message = await this.messagesService.create(createMessageDto);

    const chatId = [createMessageDto.senderId, createMessageDto.receiverId].sort().join('-');

    this.io.to(chatId).emit('newMessage', message);

    const receiverSocket = Array.from(this.connectedClients.entries())
      .find(([_, userId]) => userId === createMessageDto.receiverId)?.[0];

    if (receiverSocket) {
      this.io.to(receiverSocket).emit('messageNotification', {
        message,
        unreadCount: 1
      });
    }

    return message;
  }

  @SubscribeMessage('getUserConversations')
  async getUserConversations(@ConnectedSocket() client: Socket) {
    const userId = client.data.userId;
    return this.conversationsService.getUserConversations(userId);
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  async findOne(@MessageBody() id: string) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    const message = await this.messagesService.update(updateMessageDto.id, updateMessageDto);
    const chatId = [message.senderId, message.receiverId].sort().join('-');
    this.io.to(chatId).emit('messageUpdated', message);
    return message;
  }

  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() id: string) {
    const message = await this.messagesService.findOne(id);
    if (message) {
      const chatId = [message.senderId, message.receiverId].sort().join('-');
      await this.messagesService.remove(id);
      this.io.to(chatId).emit('messageDeleted', { id });
    }
    return { status: 'ok' };
  }

  @SubscribeMessage('markAsRead')
  async markAsRead(
    @MessageBody() data: { senderId: number, receiverId: number },
    @ConnectedSocket() client: Socket
  ) {
    const { senderId, receiverId } = data;
    await this.messagesService.markMessagesAsRead(senderId, receiverId);
    const chatId = [senderId, receiverId].sort().join('-');
    this.io.to(chatId).emit('messagesRead', { senderId, receiverId });
    return { status: 'ok' };
  }
}


/**
 * 
 * @WebSocketGateway() => this decorator marks the class as websocket gateway allowing it to handle  websocket connections and events
 * @WebSocketServer() => this decorator injects the websocket server instance into the gateway enabling the direct communication with connected events
 * OnGatewayInit => this interface provides a method afterInit() which gets executed when the websocket gateway is initialized
 *                  great place to initialize Socket setup or logging related to the gateway initialization
 * OnGatewayConnection => this interface provides a method handleConnection(client: Socket, ...args: Socket[]) that gets called when a new  connection is made
 *                        here you can handle the tasks like broadcasting an welcome message or logging
 * OnGatewayDisconnect => this interface provides a method handleDisconnect(client: Socket) that gets trigerred when an websocket client disconnects
 *                        perform Socket clean up tasks and perform Socket loggings
 * @SubscribeMessage('ping') => this decorator indicates that the method handleMessage(client: Socket, data: Socket) will handle messages withthe event name ping sent from client side
 *                        
 * 
 */