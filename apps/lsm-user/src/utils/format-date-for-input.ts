export const formatDateForInput = (date: Date) => {
    // Get the local date and time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format: YYYY-MM-DDTHH:mm
    const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log('Original date:', date);
    console.log('Formatted date:', formatted);
    return formatted;
};
