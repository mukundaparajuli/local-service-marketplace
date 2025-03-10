export enum UserRole {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN"
}

export enum PricingType {
    FIXED = "FIXED",
    HOURLY = "HOURLY",
    STARTING_AT = "STARTING_AT"
}

export interface User {
    id: number;
    email: string,
    firstName?: string | null
    lastName?: string | null
    username: string
    phoneNumber?: string | null;
    profileImage?: string | null;
    role: UserRole;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Service {
    id: number;
    name: string;
    description?: string;
    price: number;
    pricingType: PricingType;
    duration?: number | null;
    isActive: boolean;
    providerId: number;
}