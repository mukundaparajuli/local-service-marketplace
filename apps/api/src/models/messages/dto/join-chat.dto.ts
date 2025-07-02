import { IsNumber, IsOptional } from "class-validator";

export class JoinChatDto {
    @IsNumber()
    userId!: number;

    @IsOptional()
    @IsNumber()
    bookingId!: number;
}