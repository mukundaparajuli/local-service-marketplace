import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@marketplace/types';
import { LoginDto } from './dto/login.dto';

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
    async login(@Body() data: LoginDto): Promise<any> {
        return this.authService.login(data)
    }
}
