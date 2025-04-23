import { Body, Controller, Post } from '@nestjs/common';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { PaymentService } from './payment.service';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    ) { }

    @Post('initiate')
    async initiatePayment(@Body() initiatePaymentDto: InitiatePaymentDto) {
        return await this.paymentService.initiatePayment(initiatePaymentDto)
    }

    @Post('verify')
    async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto) {
        return await this.paymentService.verifyPayment(verifyPaymentDto)
    }
}
