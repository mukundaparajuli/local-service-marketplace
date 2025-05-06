export const getMyProfile = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch the user profile');
        }
        return res.json();
    } catch (error: any) {
        console.log(error);
        const errorMessage = error.message || 'Something went wrong. Please try again later.';
        return { error: true, message: errorMessage, };
    }

}