import { IsBoolean, IsJSON, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProviderProfileDto {
    @IsString()
    businessName!: string

    @IsString()
    description!: string;

    @IsString()
    @IsOptional()
    address!: string

    @IsString()
    city!: string

    @IsString()
    state!: string

    @IsString()
    @IsOptional()
    zipCode?: string

    @IsNumber()
    @IsOptional()
    latitude?: number

    @IsNumber()
    @IsOptional()
    Longitude?: number

    @IsString()
    operatingHours?: string

    @IsNumber()
    serviceRadius?: number

    @IsOptional()
    @IsBoolean()
    acceptsHomeVisits?: boolean;

    @IsOptional()
    @IsBoolean()
    hasPhysicalStore?: boolean;

    @IsOptional()
    @IsBoolean()
    isBlocked?: boolean;

    @IsNumber()
    averageRating!: number;

    @IsOptional()
    @IsNumber()
    totalReviews?: number;

    @IsOptional()
    @IsJSON()
    contactInfo?: string;
}