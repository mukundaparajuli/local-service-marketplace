export const fetchChats = async (bookingId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${bookingId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch chats');
    }

    const data = await response.json();
    return data;
}
