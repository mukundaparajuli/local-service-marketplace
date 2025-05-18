'use client';

import ProviderPage from "@/components/providers-page";
import ServicePage from "@/components/service-page";

export default function Dashboard() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ServicePage />
            <ProviderPage />
        </div>
    );
}
