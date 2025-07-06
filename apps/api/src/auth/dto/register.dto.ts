import { UserRole } from "@marketplace/types";
import { IsEmail, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsString()
    role?: UserRole;

    @IsPhoneNumber()
    phoneNumber?: string;

}