import { IsDate, IsString, IsNumber } from "class-validator";

export class RequestBookingDto {
    @IsDate()
    scheduledDate!: Date;

    @IsDate()
    scheduledEndTime!: Date;

    @IsString()
    location!: string;

    @IsString()
    totalCost!: string;

    @IsNumber()
    userId!: number;

    @IsNumber()
    serviceId!: number;

    @IsNumber()
    providerProfileId!: number;
}