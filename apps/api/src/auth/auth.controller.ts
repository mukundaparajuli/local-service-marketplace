import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@marketplace/types';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() data: RegisterDto): Promise<User> {
        return this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response, @Req() req: Request): Promise<any> {
        return this.authService.login(data, res, req)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request): Promise<any> {
        return this.authService.getMe(req);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
        return this.authService.logout(req, res);
    }
}
