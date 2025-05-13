import { format } from "date-fns";

export const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM do, yyyy');
};

export const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
};

export const formatMessageTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
};