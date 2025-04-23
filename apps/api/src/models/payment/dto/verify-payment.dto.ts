import {
    IsEnum,
    IsString,
    ValidateIf,
} from 'class-validator';
import { PaymentServiceType } from '@marketplace/types';

export class VerifyPaymentDto {
    @IsEnum(PaymentServiceType)
    paymentServiceType!: PaymentServiceType;

    @ValidateIf(o => o.paymentServiceType === PaymentServiceType.KHALTI)
    @IsString()
    pidx?: string;

    @ValidateIf(o => o.paymentServiceType === PaymentServiceType.ESEWA)
    @IsString()
    total_price?: string;

    @ValidateIf(o => o.paymentServiceType === PaymentServiceType.ESEWA)
    @IsString()
    transaction_uuid?: string;
}
import { PickType } from '@nestjs/mapped-types';

export class VerifyKhaltiDto extends PickType(VerifyPaymentDto, ['pidx'] as const) { }
export class VerifyEsewaDto extends PickType(VerifyPaymentDto, ['total_price', 'transaction_uuid'] as const) { }
