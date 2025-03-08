export interface User {
    id: number;
    email: string,
    firstName?: string | null
    lastName?: string | null
    username: string
    phoneNumber?: string | null;
    profileImage?: string | null;
    role: UserRole;
}

export interface Service {
    id: number;
    title: string;
    hourlyRate: number;
    providerId: number;
}

export enum UserRole {
    CUSTOMER,
    PROVIDER,
    ADMIN
}