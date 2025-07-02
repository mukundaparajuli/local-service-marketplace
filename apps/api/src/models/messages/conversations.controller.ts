

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('conversations')
// @UseGuards(JwtAuthGuard)
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    @Get('user/:userId')
    async getUserConversations(@Param('userId') userId: string) {
        return this.conversationsService.getUserConversations(parseInt(userId));
    }
} 