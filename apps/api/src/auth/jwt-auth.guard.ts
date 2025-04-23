import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("Missing or invalid token");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            // Optionally attach payload to request for downstream use
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return undefined;
        }
        return authHeader.split(' ')[1];
    }
}