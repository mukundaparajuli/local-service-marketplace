"use client"

import { useEffect, useState } from "react";
import { getProviders } from "../../actions/get-providers";
import ProviderCard from "./provider-card";

export default function ProvidesPage() {
    const [providers, setProviders] = useState<any>([]);

    const fetchProviders = async () => {
        try {
            const providers = await getProviders();
            setProviders(providers);
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message || 'Something went wrong. Please try again later.');
        }
    }

    useEffect(() => {
        fetchProviders();
    }, []);
    return (
        <div >
            <div className="w-full h-full p-6 flex justify-center items-center">
                {Array.isArray(providers) && providers.map((provider: any) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" key={provider.id}>
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                        <ProviderCard provider={provider} />
                    </div>
                ))
                }
            </div>
        </div>
    )
}