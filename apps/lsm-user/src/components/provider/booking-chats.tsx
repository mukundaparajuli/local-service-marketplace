import { useEffect } from "react";

export default function BookingChats() {

    const [chats, setChats] = useState<any[]>([]);

    const getChats = async () => {
        const chats = await getBookingChats();
        setChats(chats);
    }

    useEffect(() => {
        getChats();
    }, []);
    return (
        <div>
            <h1>Booking Chats</h1>
        </div>
    )
}