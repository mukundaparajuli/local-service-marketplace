import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtStrategy } from './jwt-auth.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/models/user/user.service';
import { ProviderService } from 'src/models/provider/provider.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategy, ConfigService, UserService, ProviderService],
  controllers: [AuthController]
})
export class AuthModule { }
