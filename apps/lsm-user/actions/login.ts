interface loginDataType {
    identifier: string;
    password: string;
}

export const login = async (loginData: loginDataType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include" as RequestCredentials
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'An error occurred while logging in.');
        }

        if (!data) {
            console.log(data);
        }
        return data;
    } catch (err: any) {
        console.error('Login error:', err);
        throw new Error(err.message || 'Something went wrong. Please try again later.');
    }
};
