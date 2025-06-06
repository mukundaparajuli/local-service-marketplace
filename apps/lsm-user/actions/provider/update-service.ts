export const updateService = async (serviceId: string, service: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${serviceId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(service),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occured while fetching services!');
    }

    const data = await res.json();
    return data;
}