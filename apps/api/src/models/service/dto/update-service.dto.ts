import { CreateServiceDto } from './create-service.dto';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { PricingType } from '@marketplace/types';

export class UpdateServiceDto {
    @IsString()
    @Length(3, 100)
    @IsOptional()
    name?: string;

    @IsString()
    @Length(10, 500)
    @IsOptional()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsEnum(PricingType)
    @IsOptional()
    pricingType?: PricingType;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    durationInMinutes?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
