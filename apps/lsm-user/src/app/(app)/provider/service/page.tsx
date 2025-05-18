"use client"

import { useEffect, useState } from "react";
import { fetchMyServices } from "../../../../../actions/provider/get-my-services";
import ServiceCard from "@/components/provider/service-card";

export default function ProviderServices() {
    const [services, setServices] = useState<any[]>([]);

    const getMyServices = async () => {
        const data = await fetchMyServices();
        console.log("data = ", data);
        setServices(data);
    }

    useEffect(() => {
        getMyServices();
    }, []);

    return (
        <div className="p-10">
            {
                services.length >= 0 && services.map((service) => {
                    return (
                        <div key={service.id}>
                            <ServiceCard service={service} />
                        </div>
                    )
                })
            }
        </div>
    );
}