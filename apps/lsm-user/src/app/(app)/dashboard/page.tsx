'use client';

import ProviderPage from "@/components/providers-page";
import ServicePage from "@/components/service-page";
import { useAuth } from "../../../../contexts/auth-context";
import { redirect } from "next/navigation";
export default function Dashboard() {

    const { user } = useAuth();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ServicePage />
            <ProviderPage />
        </div>
    );
}
