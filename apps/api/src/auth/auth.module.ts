import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtStrategy } from './jwt-auth.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategy, ConfigService],
  controllers: [AuthController]
})
export class AuthModule { }
