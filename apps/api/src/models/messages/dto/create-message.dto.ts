import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsString()
    senderId!: number;

    @IsNotEmpty()
    @IsString()
    receiverId!: number;

}
