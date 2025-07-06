"use client";

import { useEffect, useState } from "react";
import ChatBox from "../../../../components/chat-box";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { formatDate } from "@/utils/format";
import { useAuth } from "../../../../contexts/auth-context";
import { fetchBookingsForMe } from "../../../../../actions/provider/get-bookings-for-me";
import { getMyBookings } from "../../../../../actions/get-mybookings";

interface ChatItem {
    id: string;
    type: 'chat' | 'booking';
    bookingId: string;
    title: string;
    subtitle: string;
    lastMessage?: string;
    status?: string;
    date?: string;
}

export default function Inbox() {
    const [chatItems, setChatItems] = useState<ChatItem[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const { user } = useAuth();

    const getChatsAndBookings = async () => {
        console.log("getChatsAndBookings");
        try {
            // Fetch both chats and bookings
            const [chatsResponse, bookingsData] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/user/${user?.id}`),
                getMyBookings()
            ]);
            console.log("bookingsData", bookingsData);
            const chats = await chatsResponse.json();

            // Create a map of existing chat booking IDs
            const existingChatBookingIds = new Set(
                chats.map((chat: any) => chat.bookingId?.toString())
            );

            // Combine chats and bookings into a single list
            const combinedItems: ChatItem[] = [
                // Add existing chats
                ...chats && chats.map((chat: any) => ({
                    id: chat.id.toString(),
                    type: 'chat' as const,
                    bookingId: chat.bookingId?.toString() || '',
                    title: `${chat.participants.find((p: any) => p.id !== user?.id)?.firstName || 'User'} ${chat.participants.find((p: any) => p.id !== user?.id)?.lastName || ''
                        }`,
                    subtitle: chat.messages[0]?.content || 'No messages yet',
                    lastMessage: chat.messages[0]?.content
                })),
                // Add bookings that don't have chats yet
                ...bookingsData
                    // .filter((booking: any) =>
                    //     !existingChatBookingIds.has(booking.id.toString()) &&
                    //     booking.chatStatus === 'ENABLED'
                    // )
                    .map((booking: any) => ({
                        id: `booking-${booking.id}`,
                        type: 'booking' as const,
                        bookingId: booking.id.toString(),
                        title: `Booking #${booking.id}`,
                        subtitle: `${formatDate(booking.scheduledDate)} - ${booking.status}`,
                        status: booking.status,
                        date: booking.scheduledDate
                    }))
            ];

            console.log("combined items", combinedItems);


            setChatItems(combinedItems);
        } catch (error) {
            console.error("Error fetching chats and bookings:", error);
        }
    }

    useEffect(() => {
        if (user?.id) {
            getChatsAndBookings();
        }
    }, [user?.id]);

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
                            {chatItems.length > 0 ? (
                                chatItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedChat(item.bookingId)}
                                        className={`p-4 text-left hover:bg-muted transition-colors ${selectedChat === item.bookingId ? 'bg-muted' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <h3 className="font-medium">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.subtitle}
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
                    <ChatBox bookingId={selectedChat} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}