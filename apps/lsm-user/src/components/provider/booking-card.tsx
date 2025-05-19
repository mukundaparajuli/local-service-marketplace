import { useState } from 'react';
import { DollarSign, Calendar, Clock, MapPin, Badge } from 'lucide-react';
import { formatDate, formatTime } from '@/utils/format';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardTitle } from '../ui/card';
import { CardHeader } from '../ui/card';
import { Button } from '../ui/button';

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

interface BookingCardProps {
    booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
    const [updatedBooking, setUpdatedBooking] = useState<Booking>(booking);
    const router = useRouter();

    const handleEnableChat = () => {
        // Add your logic for enabling chat
        console.log('Enable chat for booking', booking.id);
    };

    const handleApproveBooking = () => {
        // Add your logic for approving the booking
        console.log('Approve booking', booking.id);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Booking #{booking.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Created: {formatDate(booking.createdAt)}
                        </p>
                    </div>
                    <Badge
                        className="bg-yellow-100 text-yellow-800 uppercase"
                    >
                        {updatedBooking.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Cost */}
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-muted-foreground mr-3" />
                        <div>
                            <span className="text-muted-foreground">Total Cost: </span>
                            <span className="font-semibold">${updatedBooking.totalCost}</span>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                        <div>
                            <span className="text-muted-foreground">Date: </span>
                            <span className="font-semibold">{formatDate(updatedBooking.scheduledDate)}</span>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                        <div>
                            <span className="text-muted-foreground">Time: </span>
                            <span className="font-semibold">
                                {formatTime(updatedBooking.scheduledDate)} - {formatTime(updatedBooking.scheduledEndTime)}
                            </span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                        <div>
                            <span className="text-muted-foreground">Location: </span>
                            <span className="font-semibold">{updatedBooking.location}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex space-x-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleEnableChat}
                    >
                        Enable Chat
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleApproveBooking}
                    >
                        Approve Booking
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
