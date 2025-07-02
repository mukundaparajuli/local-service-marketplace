"use client";

import { useEffect, useState } from "react"
import { getMyBookings } from "../../actions/get-mybookings";
import { toast } from "sonner";
import BookingInfoCard from "./booking-info-card";


interface Booking {
    id: number;
    status: string;
    totalCost: string;
    scheduledDate: string;
    scheduledEndTime: string;
    location: string;
    notes: string | null;
    chatStatus: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    providerProfileId: number | null;
    serviceId: number;
}
export function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMyBooking();
    }, [])



    const getMyBooking = async () => {
        try {
            const bookings = await getMyBookings();
            setBookings(bookings);
        } catch (error: any) {
            console.error(error)
            toast.error(error?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full h-full flex flex-col gap-4 justify-start items-center m-8">
            {
                bookings.map((booking: Booking) => (
                    <BookingInfoCard booking={booking} key={booking.id} />
                ))
            }
        </div>
    )
}