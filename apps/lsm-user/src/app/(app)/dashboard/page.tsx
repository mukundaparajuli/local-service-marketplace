'use client';

import ProviderPage from "@/components/providers-page";
import ServicePage from "@/components/service-page";

export default function Dashboard() {
    return (
        <div className="">
            <ServicePage />
            <ProviderPage />
        </div>
    );
}
