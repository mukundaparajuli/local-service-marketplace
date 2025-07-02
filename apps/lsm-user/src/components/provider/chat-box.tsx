// chat box that will fetch the chats for the bookings from the params

import { useEffect, useState } from "react";
import { fetchChats } from "../../../actions/fetch-chats";

export default function ChatBox({ bookingId }: { bookingId: string }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        try {
            const response = await fetchChats(bookingId);
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Chat Box</h1>
        </div>
    )
}


