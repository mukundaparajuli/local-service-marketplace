"use client";

import { useEffect, useState, useRef } from "react";
import { getBookingById } from "../../actions/get-booking-by-id";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { useAuth } from "../../contexts/auth-context";

interface Message {
    id: string;
    content: string;
    senderId: number;
    receiverId: number;
    createdAt: Date;
    isRead: boolean;
    sender: {
        id: number;
        username: string;
        firstName: string | null;
        lastName: string | null;
        profileImage: string | null;
    };
    receiver: {
        id: number;
        username: string;
        firstName: string | null;
        lastName: string | null;
        profileImage: string | null;
    };
}

export default function ChatBox({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<any>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { user } = useAuth();

    // Initialize socket connection
    useEffect(() => {
        const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000');

        socketInstance.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    // Join chat room when booking and socket are available
    useEffect(() => {
        if (socket && booking && user?.id) {
            socket.emit('joinChat', {
                userId: booking.providerProfile.userId,
                bookingId: parseInt(bookingId)
            });

            // Listen for previous messages
            socket.on('previousMessages', (previousMessages: Message[]) => {
                setMessages(previousMessages);
            });

            // Listen for new messages
            socket.on('newMessage', (message: Message) => {
                setMessages(prev => [...prev, message]);
            });

            // Listen for message updates
            socket.on('messageUpdated', (message: Message) => {
                setMessages(prev => prev.map(m => m.id === message.id ? message : m));
            });

            // Listen for message deletions
            socket.on('messageDeleted', ({ id }: { id: string }) => {
                setMessages(prev => prev.filter(m => m.id !== id));
            });

            // Listen for read receipts
            socket.on('messagesRead', () => {
                setMessages(prev => prev.map(m => ({ ...m, isRead: true })));
            });
        }
    }, [socket, booking, bookingId]);

    // Fetch booking details
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const booking = await getBookingById(bookingId);
                setBooking(booking);
            } catch (error) {
                console.error("Error fetching booking:", error);
            }
        };
        fetchBooking();
    }, [bookingId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        console.log("newMessage", newMessage);
        e.preventDefault();
        console.log("socket", socket);
        console.log("booking", booking);
        console.log("user", user);
        if (!newMessage.trim() || !socket || !booking || !user?.id) return;

        setLoading(true);
        try {
            const messageData = {
                content: newMessage.trim(),
                senderId: user?.id,
                receiverId: booking.providerProfile.userId,
                bookingId: parseInt(bookingId)
            };
            console.log("messageData", messageData);
            socket.emit('createMessage', messageData);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!booking) {
        return (
            <Card className="w-full h-full flex items-center justify-center rounded-none">
                <p className="text-muted-foreground">Loading chat...</p>
            </Card>
        );
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Card className="w-full h-full flex flex-col rounded-none">
                <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between bg-muted sticky top-25 z-10">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                                {booking.providerProfile.businessName.charAt(0)}
                            </AvatarFallback>
                            <AvatarImage src={booking.providerProfile.profileImageUrl} />
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-base">{booking.providerProfile.businessName}</h3>
                            <p className="text-xs text-muted-foreground">{booking.service.name}</p>
                        </div>
                    </div>
                    <Badge variant={booking.status === "PENDING" ? "outline" :
                        booking.status === "CONFIRMED" ? "secondary" :
                            booking.status === "COMPLETED" ? "default" : "destructive"}>
                        {booking.status}
                    </Badge>
                </CardHeader>

                <ScrollArea className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col gap-3 px-4">
                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center py-8">
                                <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.senderId === parseInt(user?.id || '0') ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${message.senderId === parseInt(user?.id || '0')
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-muted rounded-bl-none"
                                            }`}
                                    >
                                        <p className="text-sm break-words">{message.content}</p>
                                        <span className="text-xs opacity-70 block text-right mt-1">
                                            {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
                                            {message.isRead && message.senderId === parseInt(user?.id || '0') && (
                                                <span className="ml-2 text-primary-foreground/70">✓✓</span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                <CardFooter className="border-t p-2 bg-muted sticky bottom-0 z-10">
                    <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 bg-background"
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            size="sm"
                            disabled={loading || !newMessage.trim()}
                            className="min-w-[80px]"
                        >
                            {loading ? "Sending..." : "Send"}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}