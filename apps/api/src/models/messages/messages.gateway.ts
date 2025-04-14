import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Logger } from '@nestjs/common';
import { JoinChatDto } from './dto/join-chat.dto';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MessagesGateway.name);
  constructor(private readonly messagesService: MessagesService) { }
  handleDisconnect(client: any) {
    this.logger.log('Websocket server disconnected')
  }

  @WebSocketServer()
  io: any;

  afterInit() {
    this.logger.log('WebSocket server initialized')
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() joinChatDto: JoinChatDto,
    client: any
  ) {
    const { userId } = joinChatDto;
    const currentUserId = client.data.userId;

    // create a room
    const chatId = [currentUserId, userId].sort().join('-');
    client.join(chatId);

    this.logger.log(`User with user id: ${userId} joined the chat: ${chatId}`)
    this.io.to(chatId).emit('message', {
      message: `User: ${userId} joined the chat`,
      chatId
    })

    return {
      status: "ok",
      chatId
    }
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    this.logger.log(`Received message: `, createMessageDto);
    const message = await this.messagesService.create(createMessageDto);
    this.io.emit("receiveMessage", `Message ${message.content} received successfully!`);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: string) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: string) {
    return this.messagesService.remove(id);
  }
}

/**
 * 
 * @WebSocketGateway() => this decorator marks the class as websocket gateway allowing it to handle  websocket connections and events
 * @WebSocketServer() => this decorator injects the websocket server instance into the gateway enabling the direct communication with connected events
 * OnGatewayInit => this interface provides a method afterInit() which gets executed when the websocket gateway is initialized
 *                  great place to initialize any setup or logging related to the gateway initialization
 * OnGatewayConnection => this interface provides a method handleConnection(client: any, ...args: any[]) that gets called when a new  connection is made
 *                        here you can handle the tasks like broadcasting an welcome message or logging
 * OnGatewayDisconnect => this interface provides a method handleDisconnect(client: any) that gets trigerred when an websocket client disconnects
 *                        perform any clean up tasks and perform any loggings
 * @SubscribeMessage('ping') => this decorator indicates that the method handleMessage(client: any, data: any) will handle messages withthe event name ping sent from client side
 *                        
 * 
 */