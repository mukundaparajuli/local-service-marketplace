import { roles } from "@/constants/role.constants";

interface registerDataType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber?: string;
    businessName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    latitude: string,
    longitude: string,
    operatingHours: any,
    description: string,
    serviceRadius: string,
    hasPhysicalStore: boolean,
}

export const registerProvider = async (registerData: registerDataType) => {
    console.log("ok so this is the registration data: ", registerData)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register-provider`, {
            method: 'POST',
            body: JSON.stringify({
                ...registerData,
                role: roles.PROVIDER
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || 'An error occurred while registering.');
        }

        const data = await response.json();
        return data;
    } catch (err: any) {
        console.error('Registration error:', err);
        const errorMessage = err.message || 'Something went wrong. Please try again later.';
        return { error: true, message: errorMessage };
    }
};
