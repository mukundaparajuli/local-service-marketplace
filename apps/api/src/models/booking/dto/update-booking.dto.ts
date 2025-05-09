import { PartialType } from '@nestjs/mapped-types';
import { RequestBookingDto } from './request-booking.dto';

export class UpdateBookingDto extends PartialType(RequestBookingDto) { }
