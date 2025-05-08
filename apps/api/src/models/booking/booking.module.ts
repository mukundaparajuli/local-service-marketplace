import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService, JwtService],
  imports: [PrismaService]
})
export class BookingModule { }
