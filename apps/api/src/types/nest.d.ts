import { UserPayload } from '../common/interfaces / user.interface';

declare module '@nestjs/common' {
    interface Request {
        user?: UserPayload;
    }
} 