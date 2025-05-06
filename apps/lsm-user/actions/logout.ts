
export const logout = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
            method: 'POST',
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || 'An error occurred while logging out.');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err: any) {
        console.error('Logout error:', err);
        const errorMessage = err.message || 'Something went wrong. Please try again later.';
        return { error: true, message: errorMessage };
    }
};
