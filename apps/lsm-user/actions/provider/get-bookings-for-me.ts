export const fetchBookingsForMe = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/provider`, {
        method: 'GET',
        credentials: 'include',
    });

    console.log("res is here", res);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occured while fetching bookings!');
    }

    const data = await res.json();
    return data;
}