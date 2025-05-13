"use client";

import { useEffect, useState, useRef } from "react";
import { getBookingById } from "../../actions/get-booking-by-id";

import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";

interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    createdAt: Date;
    isRead: boolean;
}

export default function ChatBox({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<any>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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



    if (!booking) {
        return (
            <Card className="w-full h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Loading chat...</p>
            </Card>
        );
    }

    return (
        <Card className="w-4/5 h-full flex flex-col">
            <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{booking.providerProfile.businessName.charAt(0)}</AvatarFallback>
                        <AvatarImage src={booking.providerProfile.profileImageUrl} />
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{booking.providerProfile.businessName}</h3>
                        <p className="text-xs text-muted-foreground">{booking.service.name}</p>
                    </div>
                </div>
                <Badge variant={booking.status === "PENDING" ? "outline" :
                    booking.status === "CONFIRMED" ? "secondary" :
                        booking.status === "COMPLETED" ? "default" : "destructive"}>
                    {booking.status}
                </Badge>
            </CardHeader>

            <ScrollArea className="flex-1 p-4 h-full">
                <div className="flex flex-col gap-3">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center py-8">
                            <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.senderId === booking.userId.toString() ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.senderId === booking.userId.toString()
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <span className="text-xs opacity-70 block text-right mt-1">
                                        {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            <CardFooter className="border-t p-3">
                <form className="flex w-full gap-2">
                    <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        disabled={loading}
                    />
                    <Button type="submit" size="sm" disabled={loading || !newMessage.trim()}>
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}