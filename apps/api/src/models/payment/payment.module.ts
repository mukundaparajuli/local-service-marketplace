import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaymentController } from './payment.controller';

@Module({
  providers: [PaymentService, PrismaService],
  controllers: [PaymentController]
})
export class PaymentModule { }
