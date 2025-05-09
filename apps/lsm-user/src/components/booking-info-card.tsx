import { useState, useEffect, useRef } from 'react';
import { DollarSign, Calendar, Clock, MapPin, MessageSquare, ArrowLeft, Send, Info, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { UpdateBookingDialog } from './update-booking-dialog';
import { formatDateForInput } from '@/utils/format-date-for-input';

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

interface Message {
    id: number;
    sender: 'user' | 'provider';
    content: string;
    timestamp: string;
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
    const [activeView, setActiveView] = useState<'details' | 'chat'>('details');
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    // Simulate fetching messages (replace with API call in production)
    useEffect(() => {
        const fetchMessages = async () => {
            const sampleMessages: Message[] = [
                {
                    id: 1,
                    sender: 'provider',
                    content: `Hello! I'm looking forward to our appointment in ${booking.location}.`,
                    timestamp: '2025-04-13T18:15:00.000Z',
                },
                {
                    id: 2,
                    sender: 'user',
                    content: "Hi there! I'm excited too. Do I need to bring anything specific?",
                    timestamp: '2025-04-13T18:20:00.000Z',
                },
                {
                    id: 3,
                    sender: 'provider',
                    content: 'Just yourself and comfortable clothes. Everything else will be provided.',
                    timestamp: '2025-04-13T18:25:00.000Z',
                },
                {
                    id: 4,
                    sender: 'user',
                    content: 'Great, thanks! What time should I arrive?',
                    timestamp: '2025-04-13T18:30:00.000Z',
                },
                {
                    id: 5,
                    sender: 'provider',
                    content: 'Please arrive by 3:30 PM so we can start on time.',
                    timestamp: '2025-04-13T18:35:00.000Z',
                },
                {
                    id: 6,
                    sender: 'user',
                    content: 'Got it! See you then.',
                    timestamp: '2025-04-13T18:40:00.000Z',
                },
            ];
            setMessages(sampleMessages);
        };
        fetchMessages();
    }, [booking.location]);

    // Auto-scroll to bottom when messages change or view switches to chat
    useEffect(() => {
        if (activeView === 'chat') {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeView]);

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMMM do, yyyy');
    };

    const formatTime = (dateString: string) => {
        return format(new Date(dateString), 'h:mm a');
    };

    const formatMessageTime = (dateString: string) => {
        return format(new Date(dateString), 'h:mm a');
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim() === '') return;

        const newMessage: Message = {
            id: messages.length + 1,
            sender: 'user',
            content: messageInput,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, newMessage]);
        setMessageInput('');
        // TODO: Send message to backend API
    };

    return (
        <Card className="w-4/5 flex flex-col">
            {/* Tabbed Navigation */}
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'details' | 'chat')}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details" className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Booking Details
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Chat
                        <Badge variant="secondary" className="ml-2 bg-gray-800 text-white">
                            {booking.chatStatus}
                        </Badge>
                    </TabsTrigger>
                </TabsList>

                {/* Booking Details View */}
                <TabsContent value="details">
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
                                {booking.status}
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
                                    <span className="font-semibold">${booking.totalCost}</span>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                    <span className="text-muted-foreground">Date: </span>
                                    <span className="font-semibold">{formatDate(booking.scheduledDate)}</span>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                    <span className="text-muted-foreground">Time: </span>
                                    <span className="font-semibold">
                                        {formatTime(booking.scheduledDate)} - {formatTime(booking.scheduledEndTime)}
                                    </span>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                    <span className="text-muted-foreground">Location: </span>
                                    <span className="font-semibold">{booking.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                            >
                                <Pencil className="h-4 w-4 mr-2" />
                                <UpdateBookingDialog previousBooking={transformBookingForUpdate(booking)} open={open} setOpen={setOpen} />
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setActiveView('chat')}
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Chat Now
                            </Button>
                        </div>
                    </CardContent>
                </TabsContent>

                {/* Chat View */}
                <TabsContent value="chat" className="flex flex-col ">
                    {/* Chat Header */}
                    <CardHeader className="">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setActiveView('details')}
                                className="mr-2"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <p className="font-medium text-sm">Mukunda Parajuli</p>
                                <p className="text-xs text-muted-foreground">
                                    Booking #{booking.id} • {booking.status}
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Messages */}
                    <ScrollArea className="flex-1 max-h-[60vh] p-4 overflow-y-scroll">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`p-3 rounded-lg max-w-xs ${message.sender === 'user'
                                        ? 'bg-gray-500 text-white rounded-br-none'
                                        : 'bg-muted text-foreground rounded-bl-none'
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs mt-1 opacity-70 text-right">
                                        {formatMessageTime(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </ScrollArea>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t flex">
                        <Input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 rounded-r-none"
                        />
                        <Button
                            type="submit"
                            className="bg-gray-500 hover:bg-gray-600 rounded-l-none"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
        </Card>
    );
}