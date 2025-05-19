export const createService = async (service: any) => {
    console.log("stringifiedservice = ", JSON.stringify(service));
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(service),
    });

    console.log

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occured while fetching services!');
    }

    const data = await res.json();
    return data;
}