import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsNumber()
    senderId!: number;

    @IsNotEmpty()
    @IsNumber()
    receiverId!: number;

    @IsOptional()
    @IsNumber()
    bookingId?: number;

    @IsOptional()
    @IsNumber()
    conversationId?: number;
}
