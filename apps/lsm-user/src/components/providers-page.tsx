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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
                {Array.isArray(providers) && providers.map((proivder: any) => (
                    <ProviderCard provider={proivder} key={proivder.id} />
                ))
                }
            </div>
        </div >
    )
}