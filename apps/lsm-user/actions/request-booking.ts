type bookingInfo = {
    scheduledDate: Date;
    scheduledEndTime: Date;
    location: string;
    totalCost: number;
    notes?: string;
}

export const requestBooking = async (bookingInfo: bookingInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/`, {
        method: 'POST',
        body: JSON.stringify(bookingInfo),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occured while requesting a booking!');
    }

    console.log(res);
    const data = await res.json();

    return data;
};
