import { IsNumber, IsOptional } from "class-validator";

export class JoinChatDto {
    @IsNumber()
    userId!: number; // the user id of other user in the room

    @IsOptional()
    @IsNumber()
    bookingId?: number; // optional booking id if the chat is related to a booking
}