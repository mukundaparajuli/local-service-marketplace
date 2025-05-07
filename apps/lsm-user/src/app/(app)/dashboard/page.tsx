'use client';

import ProviderPage from "@/components/providers-page";
import ServicePage from "@/components/service-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../../../contexts/auth-context";

export default function Dashboard() {
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
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ServicePage />
            <ProviderPage />
        </div>
    );
}
