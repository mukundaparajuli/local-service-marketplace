import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { User, UserRole } from '@prisma/client';


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log(data);
        const user = await this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: hashedPassword,
            }
        })
        const { password, ...prismaResult } = user;

        const result = {
            ...prismaResult,
            role: UserRole.CUSTOMER,
        };

        return result;
    }

    // register a provider
    async registerProvider(registerProviderDto: RegisterProviderDto): Promise<User> {

        const { firstName, lastName, email, username, password, businessName, address, city, description, hasPhysicalStore, latitude, longitude, operatingHours, serviceRadius, state, zipCode, phoneNumber, role } = registerProviderDto;

        // check if user already exists
        const userExists = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (userExists) {
            throw new UnauthorizedException('User already exists with this email or username');
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // start a transaction to create user and provider profile
        const user = await this.prisma.$transaction(async (prisma) => {
            // create user
            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    username,
                    password: hashedPassword,
                    role: UserRole.PROVIDER,
                    phoneNumber,
                }
            });

            // create provider profile
            await prisma.providerProfile.create({
                data: {
                    userId: user.id,
                    businessName,
                    address,
                    city,
                    state,
                    zipCode,
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                    operatingHours: JSON.stringify(operatingHours),
                    description,
                    serviceRadius: Number(serviceRadius),
                    hasPhysicalStore
                }
            });

            return user;
        }
        );
        return user;
    }


    async validateUser(identifier: string, password: string): Promise<Omit<User, 'password'> | null> {
        console.log(identifier, password);
        const user = await this.prisma.user.findFirst({
            where: {
                OR:
                    [
                        { email: identifier },
                        { username: identifier }
                    ]
            },
            include: {
                profile: true
            }
        })
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(data: LoginDto, res: Response, req: Request): Promise<Omit<User, 'password'>> {
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
        req.user = user;

        console.log("user is here: ", req.user);

        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: "localhost"
        });

        return user;
    }


    async getMe(req: Request): Promise<any> {
        const user = req.user;
        console.log("user is here: ", user);
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