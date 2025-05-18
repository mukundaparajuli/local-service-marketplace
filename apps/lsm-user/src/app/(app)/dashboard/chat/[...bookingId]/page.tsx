import ChatBox from "@/components/chat-box";

export default function ChatPage({ params }: { params: { bookingId: string } }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ChatBox bookingId={params.bookingId} />
        </div>
    );
}