export interface User {
    id: number;
    email: string;
    role: 'provider' | 'customer';
}

export interface Service {
    id: number;
    title: string;
    hourlyRate: number;
    providerId: number;
}