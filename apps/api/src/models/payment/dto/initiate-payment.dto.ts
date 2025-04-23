import { PaymentServiceType } from "@marketplace/types"
import { IsDecimal, IsEnum, IsJSON, IsNumber, IsString } from "class-validator"
export class InitiatePaymentDto {

    @IsEnum(PaymentServiceType)
    paymentServiceType!: PaymentServiceType

    @IsString()
    return_url!: string

    @IsDecimal()
    amount!: Float32Array

    @IsNumber()
    bookingId!: number

    @IsString()
    website_url!: string

    @IsString()
    purchase_order_id!: string

    @IsJSON()
    customer_info!: JSON
}

