import { redirect } from "next/navigation";

export const getMyProfile = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.log("error:", error);
        return null;
    }
}