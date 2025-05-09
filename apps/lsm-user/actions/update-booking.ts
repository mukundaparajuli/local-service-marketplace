type bookingInfo = {
    id: number;
    scheduledDate: Date;
    scheduledEndTime: Date;
    location: string;
    totalCost: number;
    notes?: string;
}

export const updateBooking = async (bookingInfo: bookingInfo) => {
    const { id, ...rest } = bookingInfo;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/${id}`, {
        method: 'PUT',
        body: JSON.stringify(rest),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occured while updating a booking!');
    }

    console.log(res);
    const data = await res.json();

    return data;
};
