interface loginDataType {
    identifier: string;
    password: string;
}

export const login = async (loginData: loginDataType) => {
    try {
        console.log(loginData);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || 'An error occurred while logging in.');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (err: any) {
        console.error('Login error:', err);
        const errorMessage = err.message || 'Something went wrong. Please try again later.';
        return { error: true, message: errorMessage };
    }
};
