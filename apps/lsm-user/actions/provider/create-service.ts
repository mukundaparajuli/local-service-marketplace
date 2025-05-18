export const createService = async (service: any) => {
    console.log("service = ", service);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`, {
        method: 'POST',
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