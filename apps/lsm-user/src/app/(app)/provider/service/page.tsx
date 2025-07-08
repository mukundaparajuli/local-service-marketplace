"use client"

import { useEffect, useState } from "react";
import { fetchMyServices } from "../../../../../actions/provider/get-my-services";
import ServiceCard from "@/components/provider/service-card";
import { CreateServiceDialog } from "@/components/provider/create-service";
import { Button } from "@/components/ui/button";

export default function ProviderServices() {
    const [services, setServices] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    const getMyServices = async () => {
        const data = await fetchMyServices();
        console.log("data = ", data);
        setServices(data);
    }

    useEffect(() => {
        getMyServices();
    }, []);

    return (
        <div className="p-10 mt-10">
            {
                services.length >= 0 && services.map((service) => {
                    return (
                        <div key={service.id}>
                            <ServiceCard service={service} />
                        </div>
                    )
                })
            }
            <div className="mt-10 px-4">

                <Button
                    className="w-full max-w-md mx-auto py-4 text-base font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300"
                >
                    <CreateServiceDialog
                        open={open}
                        setOpen={setOpen}
                        onServiceCreated={getMyServices}
                    />
                </Button>
            </div>
        </div >
    );
}