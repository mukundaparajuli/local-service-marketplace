import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JWT_SECRET_KEY } from "../../constants/env.constants"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }



    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log("token is here: ", request.cookies);
        if (!token) {
            throw new UnauthorizedException("Missing or invalid token");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: JWT_SECRET_KEY
            });
            request.user = {
                id: payload.sub,
                email: payload.email,
                role: payload.role
            };
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
            return authHeader.split(" ")[1];
        }
        console.log(request.cookies);
        if (request.cookies && request.cookies.token) {

            console.log("token is here: ", request.cookies.token);
            return request.cookies.token;
        }
        return undefined;
    }
}