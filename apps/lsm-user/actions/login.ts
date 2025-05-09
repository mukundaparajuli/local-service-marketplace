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
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'An error occurred while logging in.');
        }

        if (!data || !data.user) {
            throw new Error('Invalid response from server');
        }

        document.cookie = `auth-state=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        return data.user;
    } catch (err: any) {
        console.error('Login error:', err);
        throw new Error(err.message || 'Something went wrong. Please try again later.');
    }
};
