"use client"

import { useEffect, useState } from "react";
import { fetchBookingsForMe } from "../../../actions/provider/get-bookings-for-me";
import BookingCard from "./booking-card";
import { Button } from "@/components/ui/button";

const STATUSES = ["ALL", "PENDING", "APPROVED", "COMPLETED", "REJECTED"];

export default function BookingsForMe() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>("ALL");

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await fetchBookingsForMe();
            setBookings(data);
            setFilteredBookings(data);
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        if (activeTab === "ALL") {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(b => b.status === activeTab));
        }
    }, [activeTab, bookings]);

    return (
        <div className="flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {STATUSES.map(status => (
                    <Button
                        key={status}
                        variant={activeTab === status ? "default" : "outline"}
                        onClick={() => setActiveTab(status)}
                    >
                        {status}
                    </Button>
                ))}
            </div>

            {/* Bookings */}
            {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))
            ) : (
                <p className="text-muted-foreground text-center">No bookings found.</p>
            )}
        </div>
    );
}
