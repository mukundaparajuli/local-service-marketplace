import { IsBoolean, IsJSON, IsString } from "class-validator";
import { RegisterDto } from "./register.dto";

export class RegisterProviderDto extends RegisterDto {
    @IsString()
    businessName!: string;

    @IsString()
    address!: string;

    @IsString()
    city!: string;

    @IsString()
    state!: string;

    @IsString()
    zipCode!: string;

    @IsString()
    latitude!: string;

    @IsString()
    longitude!: string;

    @IsJSON()
    operatingHours!: JSON;

    @IsString()
    description!: string;

    @IsString()
    serviceRadius!: string;

    @IsBoolean()
    hasPhysicalStore!: boolean;
}