import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RequestBookingDto } from './dto/request-booking.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BookingStatus, ChatStatus } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    private prisma: PrismaService
  ) { }

  // request a booking
  async requestBooking(requestBooking: RequestBookingDto) {
    this.logger.log(`Here is the booking info: `, { requestBooking });
    const booking = await this.prisma.booking.create({
      data: {
        ...requestBooking,
        status: BookingStatus.PENDING

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
}
