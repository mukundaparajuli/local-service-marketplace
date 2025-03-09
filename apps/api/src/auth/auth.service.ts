import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto';
import { User } from '@marketplace/types';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { $Enums } from '@prisma/client';
import { UserRole } from '@marketplace/types';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: hashedPassword,
                role: data.role as unknown as $Enums.UserRole,
            }
        })
        const { password, ...prismaResult } = user;

        // Map Prisma result to your User interface
        const result: User = {
            ...prismaResult,
            role: prismaResult.role as unknown as UserRole,
        };

        return result;
    }

    async validateUser(identifier: string, password: string): Promise<any> {
        const user = await this.prisma.user.findFirst({
            where: {
                OR:
                    [
                        { email: identifier },
                        { username: identifier }
                    ]
            }
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(data: LoginDto): Promise<{ access_token: string }> {
        const user = await this.validateUser(data.identifier, data.password);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
