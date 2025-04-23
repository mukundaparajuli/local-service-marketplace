import { IsNumber } from "class-validator";

export class GetProviderServicesDto {
    @IsNumber()
    providerId!: number
}