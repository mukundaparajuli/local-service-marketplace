import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { RequestBookingDto } from './dto/request-booking.dto';
import { UserRole } from '@marketplace/types';
import { Roles } from 'src/roles/role.decorator';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  requestBooking(@Body() requestBookingDto: RequestBookingDto) {
    return this.bookingService.requestBooking(requestBookingDto);
  }

  @Get('me')
  getMyBooking(@Req() req: Request) {
    return this.bookingService.getMyBooking(req);
  }

  @Patch('enable-chat/:id')
  @Roles(UserRole.ADMIN)
  enableChat(@Param('id') id: string) {
    return this.bookingService.enableChat(+id);
  }
}
