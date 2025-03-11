import { PricingType } from "@marketplace/types";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateServiceDto {
    @IsString()
    @Length(3, 100)
    name!: string;

    @IsString()
    @Length(10, 500)
    @IsOptional()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price!: number;

    @IsEnum(PricingType)
    pricingType!: PricingType;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    durationInMinutes?: number;
}
