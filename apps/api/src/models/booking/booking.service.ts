import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RequestBookingDto } from './dto/request-booking.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BookingStatus, ChatStatus } from '@prisma/client';
import { Request } from 'express';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    private prisma: PrismaService
  ) { }

  // request a booking
  async requestBooking(req: Request, requestBooking: RequestBookingDto) {
    this.logger.log(`Here is the booking info: `, { requestBooking });

    if (!req.user || !req.user['id']) {
      throw new UnauthorizedException("Unauthorized: token not found");
    }
    const userId = req.user['id'];
    const booking = await this.prisma.booking.create({
      data: {
        ...requestBooking,
        status: BookingStatus.PENDING,
        userId
      }
    });
    return booking;
  }


  async getMyBooking(req: Request) {
    const user = req.user;
    console.log(user)

    if (!user) {
      throw new UnauthorizedException("Unauthorized: token not found");
    }
    const userId = user['id'];
    const bookings = await this.prisma.booking.findMany({
      where: {
        userId: userId,
      }
    })
    return { bookings };
  }

  // enable chat for booking
  async enableChat(id: number) {
    this.logger.debug(`${id}`)
    const chatEnabledBooking = await this.prisma.booking.update({
      where: {
        id
      },
      data: {
        chatStatus: ChatStatus.ENABLED
      }
    })
    this.logger.debug(`Chat status has been enabled for the booking: `, chatEnabledBooking);
  }


  // update booking
  async updateBooking(req: Request, updateBookingDto: UpdateBookingDto) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException("Unauthorized: token not found");
    }
    const userId = user['id'];
    const { bookingId } = req.params;

    if (!bookingId) {
      throw new BadRequestException("Booking ID is required");
    }

    const booking = await this.prisma.booking.update({
      where: {
        id: +bookingId
      },
      data: {
        ...updateBookingDto,
        userId
      }
    })
    return booking;
  }
}