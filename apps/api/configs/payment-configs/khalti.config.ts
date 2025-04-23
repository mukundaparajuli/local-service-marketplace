import { InitiatePaymentDto } from "src/models/payment/dto/initiate-payment.dto";

const khaltiConfig = (initiatePaymentDto: InitiatePaymentDto) => {
    return {
        return_url: initiatePaymentDto.return_url,
        website_url: initiatePaymentDto.website_url,
        amount: initiatePaymentDto.amount,
        purchase_order_id: initiatePaymentDto.bookingId,
        purchase_order_name: `Payment for the booking: ${initiatePaymentDto.bookingId}`,
        customer_info: initiatePaymentDto.customer_info
    }
}
export default khaltiConfig;