"use client"

import ServiceDetail from '@/components/service-detail-page';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getServiceById } from '../../../../../../actions/get-service-by-id';

const mockService = {
    id: 1,
    name: "Haircut",
    description: "Professional haircut service by experienced stylists.",
    price: "20",
    pricingType: "Fixed",
    duration: 30,
    isActive: true,
    imageUrl: "https://via.placeholder.com/600x400",
    ProviderProfile: {
        id: 101,
        businessName: "Style Studio",
        address: "123 Main St, Pokhara",
        contactInfo: "9800000000",
    },
};


const Page = () => {
    const { id } = useParams();
    console.log("id is here", id);
    const [service, setService] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchService = async () => {
            const data = await getServiceById(id as string);
            setService(data.service);
            console.log("data is here", data);
        };
        fetchService();
    }, [id]);

    console.log("here is the service: ", service);

    if (!id) {
        return <div>No id found</div>;
    }

    if (!service) {
        return <div>No service found</div>;
    }

    return (
        <ServiceDetail service={service} />
    )
}

export default Page;