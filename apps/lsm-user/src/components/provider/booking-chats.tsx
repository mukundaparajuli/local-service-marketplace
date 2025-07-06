import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import ChatBox from "../chat-box";

export default function BookingChats() {
    const [chats, setChats] = useState<any[]>([]);
    const { user } = useAuth();

    const getChats = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/user/${user?.id}`);
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    useEffect(() => {
        if (user?.id) {
            getChats();
        }
    }, [user?.id]);

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Booking Chats</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chats.map((chat) => (
                    <div key={chat.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h2 className="font-semibold mb-2">
                            {chat.participants.find((p: any) => p.id !== user?.id)?.firstName || 'User'} {chat.participants.find((p: any) => p.id !== user?.id)?.lastName || ''}
                        </h2>
                        <p className="text-sm text-gray-600 mb-2">
                            Booking ID: {chat.bookingId}
                        </p>
                        <a
                            href={`/dashboard/chat/${chat.bookingId}`}
                            className="text-primary hover:underline"
                        >
                            Open Chat
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}