export const fetchMyServices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/me`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occured while fetching services!');
    }

    const data = await res.json();
    return data;
}