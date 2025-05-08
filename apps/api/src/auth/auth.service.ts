import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto';
import { User } from '@marketplace/types';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@marketplace/types';
import { Request, Response } from 'express';
import { UserService } from 'src/models/user/user.service';


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async register(data: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log(data);
        const user = await this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: hashedPassword,
                role: UserRole.CUSTOMER,
            }
        })
        const { password, ...prismaResult } = user;

        const result: User = {
            ...prismaResult,
            role: prismaResult.role as unknown as UserRole,
        };

        return result;
    }

    async validateUser(identifier: string, password: string): Promise<any> {
        console.log(identifier, password);
        const user = await this.prisma.user.findFirst({
            where: {
                OR:
                    [
                        { email: identifier },
                        { username: identifier }
                    ]
            }
        })
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(data: LoginDto, res: Response): Promise<any> {
        const user = await this.validateUser(data.identifier, data.password);

        if (!user) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }

        const token = this.jwtService.sign(payload);

        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            domain: "localhost"
        });

        return {
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                token,
            }
        };
    }


    async getMe(req: Request): Promise<any> {
        const token = req.cookies?.token;
        if (!token) {
            throw new UnauthorizedException('Missing or invalid token');
        }

        const decodedToken = this.jwtService.verify(token as string);
        this.logger.log('Decoded token:', decodedToken);
        const user = await this.userService.findOne(decodedToken.sub);
        this.logger.log('User:', user);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }

    async logout(req: Request, res: Response): Promise<any> {
        res.clearCookie('token');
        return { message: 'Logged out successfully' };
    }
}