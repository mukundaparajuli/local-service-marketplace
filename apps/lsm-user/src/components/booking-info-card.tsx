import { useState } from 'react';
import { DollarSign, Calendar, Clock, MapPin, MessageSquare, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UpdateBookingDialog } from './update-booking-dialog';
import { formatDateForInput } from '@/utils/format-date-for-input';
import { formatDate, formatTime } from '@/utils/format';
import { useRouter } from 'next/navigation';

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

const transformBookingForUpdate = (booking: Booking) => {
    const transformed = {
        id: booking.id,
        scheduledDate: formatDateForInput(new Date(booking.scheduledDate)),
        scheduledEndTime: formatDateForInput(new Date(booking.scheduledEndTime)),
        location: booking.location,
        notes: booking.notes || '',
        totalCost: parseFloat(booking.totalCost)
    };
    console.log('Transformed booking:', transformed);
    return transformed;
};

interface BookingCardProps {
    booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [updatedBooking, setUpdatedBooking] = useState<Booking>(booking);
    const router = useRouter();

    const handleChatRedirection = () => {
        router.push(`/dashboard/chat/${booking.id}`);
    }

    return (
        <Card className="w-4/5">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Booking #{booking.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Created: {formatDate(booking.createdAt)}
                        </p>
                    </div>
                    <Badge
                        variant="secondary"
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
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        <UpdateBookingDialog
                            previousBooking={transformBookingForUpdate(updatedBooking)}
                            open={open}
                            setOpen={setOpen}
                            setUpdatedBooking={setUpdatedBooking}
                        />
                    </Button>
                    <Button
                        variant="outline"
                        className={`flex-1 ${booking.chatStatus === 'PENDING' ? 'bg-gray-300 cursor-not-allowed' : ''}`}
                        onClick={handleChatRedirection}
                        disabled={booking.chatStatus === 'PENDING'}

                    >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}