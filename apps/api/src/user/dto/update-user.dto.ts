import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsEmail()
    email?: string;

    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    profileImage?: string

    @IsString()
    username?: string

    @IsString()
    phoneNumber?: string
}