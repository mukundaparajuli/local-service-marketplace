"use client"

import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/auth-context";
import { PropsWithChildren, useEffect } from "react";

export default function Page({ children }: PropsWithChildren) {
    const { user } = useAuth();
    const router = useRouter();

    // Add a loading state if you have it exposed, OR track 'user === undefined'
    const isLoading = user === undefined;

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading]);

    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            {children}
        </div>
    )
}