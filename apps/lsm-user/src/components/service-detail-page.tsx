"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RequestBookingDialog } from "./dialog-box";
import { useState } from "react";

type Service = {
    id: number;
    name: string;
    description: string;
    price: string;
    pricingType: string;
    duration: number;
    isActive: boolean;
    imageUrl?: string;
    ProviderProfile: {
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
    const [open, setOpen] = useState(false);
    return (
        <div className="w-4/5 mx-auto bg-background text-foreground shadow-lg rounded-xl overflow-hidden">
            {/* Hero Section */}
            <div className="relative">
                {service.imageUrl ? (
                    <div className="h-80 w-full relative">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-xs font-medium px-3 py-1 rounded-full w-fit mb-2",
                                    service.isActive
                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                )}
                            >
                                {service.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <h1 className="text-4xl font-bold text-primary-foreground">{service.name}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-gray-500 to-purple-600 dark:from-gray-700 dark:to-purple-900 p-6">
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full w-fit mb-2",
                                service.isActive
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            )}
                        >
                            {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <h1 className="text-4xl font-bold text-primary-foreground">{service.name}</h1>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 space-y-8">
                {/* Description */}
                <div>
                    <h2 className="text-lg font-medium text-muted-foreground mb-2">About this service</h2>
                    <p className="text-lg">{service.description}</p>
                </div>

                {/* Service Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground">Service Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <span className="block text-sm font-medium text-muted-foreground mb-1">Price</span>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{service.price}</span>
                                <span className="ml-2 text-sm text-muted-foreground">({service.pricingType})</span>
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-muted-foreground mb-1">Duration</span>
                            <div className="flex items-center">
                                <span className="text-xl font-semibold">{service.duration} mins</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Provider Profile */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground">Service Provider</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-medium">
                            {service.ProviderProfile.businessName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{service.ProviderProfile.businessName}</h3>
                            {service.ProviderProfile.address && (
                                <p className="text-muted-foreground mt-1">{service.ProviderProfile.address}</p>
                            )}
                            {service.ProviderProfile.contactInfo && (
                                <a
                                    href={`tel:${service.ProviderProfile.contactInfo}`}
                                    className="block mt-1 text-muted-foreground hover:text-foreground transition"
                                >
                                    {service.ProviderProfile.contactInfo}
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Button variant="outline" className="w-full">
                    <RequestBookingDialog open={open} setOpen={setOpen} providerProfileId={service.ProviderProfile.id} />
                </Button>
            </div>
        </div>
    );
};

export default ServiceDetail;
