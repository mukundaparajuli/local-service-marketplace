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

export enum PaymentServiceType {
    KHALTI = "KHALTI",
    ESEWA = "ESEWA",
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

export interface ProviderProfile {
    id: number;
    businessName: string;
    description: string;
    address?: string | null;
    city: string;
    state: string;
    zipCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    operatingHours?: any;
    serviceRadius?: number | null;
    acceptsHomeVisits: boolean;
    hasPhysicalStore: boolean;
    isBlocked: boolean;
    averageRating: number;
    totalReviews: number;
    contactInfo?: any;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
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

export enum BookingStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export enum ChatStatus {
    "ENABLED" = "ENABLED",
    "DISABLED" = "DISABLED"
}