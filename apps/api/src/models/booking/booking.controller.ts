import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { RequestBookingDto } from './dto/request-booking.dto';
import { UserRole } from '@marketplace/types';
import { Roles } from 'src/roles/role.decorator';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBookingDto } from './dto/update-booking.dto';

@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  requestBooking(@Req() req: Request, @Body() requestBookingDto: RequestBookingDto) {
    return this.bookingService.requestBooking(req, requestBookingDto);
  }

  @Get('me')
  getMyBooking(@Req() req: Request) {
    return this.bookingService.getMyBooking(req);
  }

  @Get(':bookingId')
  getBookingById(@Param('bookingId') bookingId: string) {
    return this.bookingService.getBookingById(bookingId);
  }

  @Patch('enable-chat/:id')
  @Roles(UserRole.ADMIN)
  enableChat(@Param('id') id: string) {
    return this.bookingService.enableChat(+id);
  }

  @Put(':bookingId')
  updateBooking(@Req() req: Request, @Param('bookingId') bookingId: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.updateBooking(req, updateBookingDto);
  }
}
