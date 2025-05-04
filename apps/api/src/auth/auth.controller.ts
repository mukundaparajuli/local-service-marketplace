import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@marketplace/types';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

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
    async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
        return this.authService.login(data, res)
    }
}
