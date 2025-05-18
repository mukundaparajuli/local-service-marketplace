export const getServiceById = async (serviceId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${serviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || 'An error occurred while fetching booking.');
        }

        const data = await response.json();

        console.log("data is here", data)
        console.log(data);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'Something went wrong. Please try again later.');
    }
}