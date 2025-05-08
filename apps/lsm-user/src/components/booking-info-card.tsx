import { useState } from 'react';
import { Calendar, Clock, MapPin, DollarSign, FileText, AlertCircle } from 'lucide-react';

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

export default function BookingCard(booking: Booking) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Format date and time
    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get time range
    const startTime = formatTime(booking.scheduledDate);
    const endTime = formatTime(booking.scheduledEndTime);

    // Status badge color
    const getStatusColor = (status: any) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="w-2/5">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="p-4 bg-gray-500 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Booking #{booking.id}</h3>
                        <div className="text-sm opacity-90">Created on {new Date(booking.createdAt).toLocaleDateString()}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                    </span>
                </div>

                {/* Main Content */}
                <div className="p-4">
                    <div className="space-y-4">
                        {/* Date and Time */}
                        <div className="flex items-start">
                            <Calendar className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">Date</p>
                                <p className="text-gray-600">{formatDate(booking.scheduledDate)}</p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start">
                            <Clock className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">Time</p>
                                <p className="text-gray-600">{startTime} - {endTime}</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start">
                            <MapPin className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">Location</p>
                                <p className="text-gray-600">{booking.location}</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-start">
                            <DollarSign className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">Total Cost</p>
                                <p className="text-gray-600">${booking.totalCost}</p>
                            </div>
                        </div>

                        {/* Additional details when expanded */}
                        {isExpanded && (
                            <>
                                {/* Service ID */}
                                <div className="flex items-start">
                                    <FileText className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Service ID</p>
                                        <p className="text-gray-600">{booking.serviceId}</p>
                                    </div>
                                </div>

                                {/* Chat Status */}
                                <div className="flex items-start">
                                    <AlertCircle className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Chat Status</p>
                                        <p className="text-gray-600">{booking.chatStatus}</p>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="flex items-start">
                                    <FileText className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Notes</p>
                                        <p className="text-gray-600 italic">{booking.notes || "No notes available"}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer with actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                        {isExpanded ? "Show Less" : "Show More Details"}
                    </button>

                    <div className="space-x-2">
                        <button className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600 transition-colors">
                            Modify
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}