import { IsNumber } from "class-validator";

export class JoinChatDto {
    @IsNumber()
    userId!: number //the user id of other user in the room
}