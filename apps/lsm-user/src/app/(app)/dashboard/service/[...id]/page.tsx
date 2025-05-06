import ServiceDetail from '@/components/service-detail-page';
import React from 'react';

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
    return <ServiceDetail service={mockService} />;
};

export default Page;
