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
    const [service, setService] = useState(null);

    if (!id) {
        return <div>No id found</div>;
    }
    useEffect(() => {
        const fetchService = async () => {
            const data = await getServiceById(id as string);
            setService(data.service);
        };
        fetchService();
    }, []);

    console.log("here is the service: ", service);
    return (
        service && <ServiceDetail service={service} />
    )
}

export default Page;