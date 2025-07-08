"use client";

import { useEffect, useState } from "react";
import ChatBox from "../../../../components/chat-box";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { formatDate } from "@/utils/format";
import { useAuth } from "../../../../contexts/auth-context";
import { fetchBookingsForMe } from "../../../../../actions/provider/get-bookings-for-me";
import { getMyBookings } from "../../../../../actions/get-mybookings";
import { ChatStatus } from "@/constants/chatstatus.constant";

type Message = {
    bookingId: number;
    content: string;
    conversationId: number;
    createdAt: string;
    id: string;
    isRead: boolean;
    receiverId: number;
    senderId: number;
}

type Booking = {
    id: number;
    serviceId: number;
    chatStatus: string;
    location: string;
    notes: string;
    providerProfileId: number;
    scheduledDate: string;
    scheduledEndTime: string;
    status: string;
    totalCost: string;
    userId: string;
    providerProfile: {
        profileImageUrl: string;
        userId: number;
        businessName: string;
    },
    service: {
        name: string;
    }
    conversations: Message[]
    createdAt: string;
    updatedAt: string;
}


export default function Inbox() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedChat, setSelectedChat] = useState<Booking | null>(null);

    const getAllBookings = async () => {
        try {
            const bookingsData = await getMyBookings();
            console.log(bookingsData);
            setBookings(bookingsData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBookings();
    }, []);

    return (
        <div className="w-full h-auto flex">
            {/* Chat List */}
            <div className="w-1/3 min-w-[300px] m-0">
                <CardHeader className="border-b">
                    <h2 className="text-xl font-semibold">Messages</h2>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="flex flex-col">
                            {bookings.length > 0 ? (
                                bookings.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            if (!item.chatStatus.includes(ChatStatus.PENDING)) {
                                                setSelectedChat(item);
                                                console.log("selecting...");
                                            }
                                        }}
                                        className={`p-4 text-left hover:bg-muted transition-colors ${selectedChat?.id === item.id ? 'bg-muted' : ''} ${item.chatStatus.includes(ChatStatus.PENDING) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                        disabled={item.chatStatus.includes(ChatStatus.PENDING)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <h3 className="font-medium">
                                                    {item.providerProfile.businessName}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    For {item.service.name}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center p-4">No messages or bookings available</p>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </div>

            {/* Chat Window */}
            <div className="flex-1">
                {selectedChat ? (
                    <ChatBox booking={selectedChat} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}