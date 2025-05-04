interface registerDataType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber?: string;
}

export const register = async (registerData: registerDataType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerData),
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
