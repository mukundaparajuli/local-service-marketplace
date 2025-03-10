import { UserRole } from "@marketplace/types";

export interface UserPayload {
    id: number;
    email: string;
    role: UserRole;
}