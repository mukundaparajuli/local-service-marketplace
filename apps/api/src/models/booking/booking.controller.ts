import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { RequestBookingDto } from './dto/request-booking.dto';
import { UserRole } from '@marketplace/types';
import { Roles } from 'src/roles/role.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  requestBooking(@Body() requestBookingDto: RequestBookingDto) {
    return this.bookingService.requestBooking(requestBookingDto);
  }

  @Patch('enable-chat/:id')
  @Roles(UserRole.ADMIN)
  enableChat(@Param('id') id: string) {
    return this.bookingService.enableChat(+id);
  }
}
