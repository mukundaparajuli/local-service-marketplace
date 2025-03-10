import { UserRole } from "@prisma/client";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsString()
    role!: UserRole;
}