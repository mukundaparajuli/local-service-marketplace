import { Injectable, Logger } from '@nestjs/common';
import { PaymentServiceType } from '@marketplace/types';
import { ESEWA_PAYMENT_INITIATION_URL, ESEWA_PAYMENT_VERIFICATION_URL, KHALTI_LIVE_SECRET_KEY, KHALTI_PAYMENT_INITIATION_URL, KHALTI_PAYMENT_VERIFICATION_URL } from 'constants/env.constants';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { esewaConfig, khaltiConfig } from 'configs/payment-configs';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    constructor(
        private prisma: PrismaService
    ) { }

    async initiatePayment(initiatePaymentDto: InitiatePaymentDto) {
        const { paymentServiceType } = initiatePaymentDto;
        switch (paymentServiceType) {
            case PaymentServiceType.KHALTI:
                return this.initiateKhaltiPayment(initiatePaymentDto);
            case PaymentServiceType.ESEWA:
                return this.initiateEsewaPayment(initiatePaymentDto);
            default:
                this.logger.error(`Invalid payment service type`)
        }
    }

    async initiateKhaltiPayment(initiatePaymentDto: InitiatePaymentDto) {

        const initiateKhaltiPaymentConfig = khaltiConfig(initiatePaymentDto);

        const response = await fetch(`${KHALTI_PAYMENT_INITIATION_URL}`, {
            headers: {
                "Authorization": `Key ${KHALTI_LIVE_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(initiateKhaltiPaymentConfig),
        });

        const paymentResponse = await response.json();
        this.logger.log(paymentResponse);
        if (!response.ok) {
            this.logger.error("Khalti payment initiation error:", paymentResponse);
            throw new Error(
                `Failed to initiate payment: ${paymentResponse.message || "Unknown error"}`
            );
        }
        return { paymentResponse }
        // if the payment was successful we will get the response

        // TODO: Save the payment details into the database
        // T0D0: Return the redirection url to the frontend

        // after the redirection url is sent to the frontend the urser will be redirected to the payment page to make a payment
        // after the payment is made the payment can be either successful or unsuccessful
        // if the payment was successful the user will be redirected to the successpage else the user will be redirected to the payment failure page
    }

    async initiateEsewaPayment(initiatePaymentDto: InitiatePaymentDto) {

        const initiateEsewaPaymentConfig = esewaConfig(initiatePaymentDto);

        const response = await fetch(`${ESEWA_PAYMENT_INITIATION_URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(initiateEsewaPaymentConfig),
        });

        const jsonResponse = await response.json();
        if (!response.ok) {
            this.logger.error(`Esewa API responded with status: ${response.status}`);
            throw new Error(` Esewa payment failed: ${jsonResponse.error_message}`);
        }
    }
    async verifyPayment(verifyPaymentDto: VerifyPaymentDto) {
        const { paymentServiceType, pidx, total_price, transaction_uuid } = verifyPaymentDto;
        switch (paymentServiceType) {
            case PaymentServiceType.KHALTI:
                if (pidx) {
                    return this.verifyKhaltiPayment(pidx);
                } else {
                    throw new Error('Invalid pidx');
                }
            case PaymentServiceType.ESEWA:
                if (total_price && transaction_uuid) {
                    return this.verifyEsewaPayment({ total_amount: total_price, transaction_uuid });
                } else {
                    throw new Error('Invalid total_price or transaction_uuid');
                }
        }
    }

    async verifyKhaltiPayment(pidx: string) {
        const response = await fetch(`${KHALTI_PAYMENT_VERIFICATION_URL}`,
            {
                headers: {
                    "Authorization": `Key ${KHALTI_LIVE_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ pidx }),
            }
        );

        const jsonResponse = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to verify payment: ${jsonResponse.message || response.statusText}`);
        }
        this.logger.log("payment has been verified", jsonResponse);
        return jsonResponse;
    }

    async verifyEsewaPayment(
        { total_amount, transaction_uuid }: {
            total_amount: string,
            transaction_uuid: string
        }) {
        const response = await fetch(
            `${ESEWA_PAYMENT_VERIFICATION_URL}/total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`,
        );

        const jsonResponse = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to verify payment: ${jsonResponse.message || response.statusText}`);
        }
        this.logger.log("payment has been verified", jsonResponse);
        return jsonResponse;
    }

}
