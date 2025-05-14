import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, DollarSign, Building2, MapPin } from "lucide-react";
import Link from "next/link";

type Service = {
    id: number;
    name: string;
    description: string;
    price: string;
    pricingType: string;
    duration: number;
    isActive: boolean;
    imageUrl?: string;
    providerProfile: {
        id: number;
        businessName: string;
        address: string | null;
        contactInfo: string | null;
    };
};

export default function ServiceCard({ service }: { service: Service }) {
    const hours = Math.floor(service.duration / 3600);
    const minutes = Math.floor((service.duration % 3600) / 60);

    let durationLabel = "N/A";
    if (hours > 0 && minutes > 0) {
        durationLabel = `${hours} hr ${minutes} min`;
    } else if (hours > 0) {
        durationLabel = `${hours} hr${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        durationLabel = `${minutes} min`;
    }

    return (
        <Link href={"/dashboard/service/" + service.id} className="flex flex-col items-center w-full">
            <Card className="w-full max-w-sm overflow-hidden transition hover:shadow-lg p-0">
                {service.imageUrl ? (
                    <div className="relative h-48 w-full overflow-hidden">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="h-full w-full object-cover"
                        />
                        <Badge
                            variant={service.isActive ? "default" : "destructive"}
                            className="absolute top-3 right-3"
                        >
                            {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                ) : (
                    <div className="relative h-48 w-full overflow-hidden bg-muted flex items-center justify-center">
                        <img
                            src="https://bathsense.asianpaints.com/content/dam/ap-bathsense-revamp/findaplumber/plumberd.png"
                            alt="Service placeholder"
                            className="h-full w-full object-cover opacity-80"
                        />
                        <Badge
                            variant={service.isActive ? "default" : "destructive"}
                            className="absolute top-3 right-3"
                        >
                            {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                )}

                <CardHeader>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">{service.name}</h2>
                    <p className="text-sm text-muted-foreground">{service.providerProfile.businessName}</p>
                </CardHeader>

                <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{service.description}</p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">${service.price}</p>
                                <p className="text-xs text-muted-foreground">{service.pricingType}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">{durationLabel}</p>
                                <p className="text-xs text-muted-foreground">Duration</p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t pt-4 pb-4 bg-muted/50">
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex items-start gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <span className="text-sm text-muted-foreground">{service.providerProfile.businessName}</span>
                        </div>

                        {service.providerProfile.address && (
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <span className="text-sm text-muted-foreground">{service.providerProfile.address}</span>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}