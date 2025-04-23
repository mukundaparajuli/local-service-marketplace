import { ESEWA_MERCHANT_CODE, FRONTEND_BASE_URL } from "constants/env.constants";
import { InitiatePaymentDto } from "src/models/payment/dto/initiate-payment.dto";

const esewaConfig = (initiatePaymentDto: InitiatePaymentDto) => {
    return {
        amount: initiatePaymentDto.amount,
        tax_amount: 0,
        total_amount: initiatePaymentDto.amount,
        transaction_uuid: initiatePaymentDto.bookingId,
        product_code: ESEWA_MERCHANT_CODE,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: `${FRONTEND_BASE_URL}/success?method=esewa`,
        failure_url: `${FRONTEND_BASE_URL}`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
    }
}

export default esewaConfig;