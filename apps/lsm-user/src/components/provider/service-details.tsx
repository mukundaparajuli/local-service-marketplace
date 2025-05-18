"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UpdateServiceDialog } from "@/components/provider/update-service";

type Service = {
    id: number;
    name: string;
    description: string;
    price: string;
    pricingType: string;
    duration: number;
    isActive: boolean;
    // TODO: add imageUrl
    // imageUrl?: string;
    providerProfile: {
        id: number;
        businessName: string;
        address: string | null;
        contactInfo: string | null;
    };
};

interface ServiceDetailProps {
    service: Service;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
    console.log("here is the service: ", service);
    const [open, setOpen] = useState(false);
    const [updatedService, setUpdatedService] = useState(service);
    return (
        <div className="w-11/12 md:w-4/5 mx-auto bg-background text-foreground overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Hero Section */}
            <div className="relative">
                <div className="bg-gradient-to-r from-gray-400 to-gray-700 dark:from-gray-700 dark:to-slate-400 p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                    </div>
                    <div className="relative z-10">
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-xs font-medium px-4 py-1.5 rounded-full w-fit mb-3 shadow-sm transition-all duration-300 hover:shadow-md",
                                service.isActive
                                    ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/60 dark:text-green-300 dark:border-green-800"
                                    : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/60 dark:text-red-300 dark:border-red-800"
                            )}
                        >
                            {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">{service.name}</h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 lg:p-10 space-y-8">
                {/* Description */}
                <div className="animate-fade-in">
                    <h2 className="text-lg font-medium text-muted-foreground mb-3">About this service</h2>
                    <p className="text-lg leading-relaxed">{service.description}</p>
                </div>

                {/* Service Details */}
                <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                        <CardTitle className="text-muted-foreground text-lg py-2">Service Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        <div className="bg-gray-50/50 dark:bg-gray-900/20 p-4 rounded-lg">
                            <span className="block text-sm font-medium text-muted-foreground mb-1">Price</span>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-primary">{service.price}</span>
                                <span className="ml-2 text-sm text-muted-foreground">({service.pricingType})</span>
                            </div>
                        </div>
                        <div className="bg-gray-50/50 dark:bg-gray-900/20 p-4 rounded-lg">
                            <span className="block text-sm font-medium text-muted-foreground mb-1">Duration</span>
                            <div className="flex items-center">
                                <span className="text-xl font-semibold text-primary">{service.duration} mins</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Provider Profile */}
                <Card className="w-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                        <CardTitle className="text-muted-foreground text-lg py-2">Service Provider</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-semibold shadow-sm">
                            {service.providerProfile.businessName.charAt(0)}
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold">{service.providerProfile.businessName}</h3>
                            {service.providerProfile.address && (
                                <p className="text-muted-foreground mt-2">{service.providerProfile.address}</p>
                            )}
                            {service.providerProfile.contactInfo && (
                                <a
                                    href={`tel:${service.providerProfile.contactInfo}`}
                                    className="block mt-2 text-primary hover:text-primary/80 transition-colors"
                                >
                                    {service.providerProfile.contactInfo}
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Button
                    variant="default"
                    className="w-full py-6 text-lg font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <UpdateServiceDialog open={open} setOpen={setOpen} previousService={service} setUpdatedService={setUpdatedService} />
                </Button>
            </div>
        </div>
    );
};

export default ServiceDetail;