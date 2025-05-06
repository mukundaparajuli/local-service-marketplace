"use client";

import React, { useState } from "react";
import {
    Star,
    MapPin,
    Phone,
    Mail,
    Clock,
    Shield,
    Calendar,
    Home,
    Store,
    ChevronRight,
    MessageSquare,
    Share2,
    User,
    ThumbsUp,
    Filter,
    CreditCard,
    Bookmark,
} from "lucide-react";

const ProviderDetailsPage = () => {
    const [activeTab, setActiveTab] = useState("services");

    // Provider data
    const provider = {
        id: 1,
        businessName: "Mukunda Parajuli",
        description: "Professional plumbing services with a focus on quality and reliability.",
        city: "Pokhara",
        state: "Gandaki",
        averageRating: 0,
        totalReviews: 0,
        acceptsHomeVisits: false,
        hasPhysicalStore: false,
        isKYCVerified: false,
        operationHours: "Mon-Fri 9 AM - 5 PM",
        createdAt: "2025-04-13T22:50:31.563Z",
    };

    // Simulated related data
    const services = [
        { id: 1, title: "Plumbing Services", price: 1200, category: "Home Repair", rating: 4.8 },
        { id: 2, title: "Pipe Installation", price: 2500, category: "Installation", rating: 4.5 },
        { id: 3, title: "Leak Detection", price: 1800, category: "Inspection", rating: 4.9 },
    ];

    const reviews = [
        {
            id: 1,
            user: "Ramesh Sharma",
            rating: 5,
            date: "2025-03-15",
            comment: "Great service, very professional and timely.",
            liked: 4,
        },
        {
            id: 2,
            user: "Sita Gurung",
            rating: 4,
            date: "2025-03-10",
            comment: "Good work but arrived a bit late.",
            liked: 2,
        },
    ];

    // Utility functions
    const formatJoinDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
        });
    };

    const getJoinedDuration = (dateString: string) => {
        const joinDate = new Date(dateString);
        const now = new Date();
        const diffMilliseconds = Math.abs(now.getTime() - joinDate.getTime());
        const diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} days`;
        const months = Math.floor(diffDays / 30);
        if (diffDays < 365) return `${months} month${months > 1 ? "s" : ""}`;
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? "s" : ""}`;
    };

    // Reusable Components
    const RatingStars = ({ rating }: { rating: number }) => (
        <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? "text-amber-400 fill-amber-400" : "text-zinc-300"}
                    aria-hidden="true"
                />
            ))}
        </div>
    );

    const InfoItem = ({ icon: Icon, label, value, secondaryValue }: { icon: any, label: string, value?: string, secondaryValue?: string }) => (
        <div className="flex items-start">
            <Icon size={18} className="text-zinc-500 mt-1 flex-shrink-0" />
            <div className="ml-3">
                <p className="text-zinc-700">{label}</p>
                {value && <p className="text-zinc-500 text-sm">{value}</p>}
                {secondaryValue && <p className="text-zinc-500 text-sm">{secondaryValue}</p>}
            </div>
        </div>
    );

    const StatusItem = ({ icon: Icon, condition, positiveText, negativeText }: { icon: any, condition: boolean, positiveText: string, negativeText: string }) => (
        <div className="flex items-center">
            <Icon size={18} className={condition ? "text-emerald-500" : "text-zinc-400"} />
            <span className={`ml-2 ${condition ? "text-zinc-700" : "text-zinc-500"}`}>
                {condition ? positiveText : negativeText}
            </span>
        </div>
    );

    const ActionButton = ({ icon: Icon, label, primary = false }: { icon: any, label: string, primary?: boolean }) => (
        <button
            className={`w-full py-2.5 rounded-lg flex items-center justify-center transition-all duration-200 ${primary
                ? "bg-gray-600 text-primary-foreground hover:bg-gray-700"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
            aria-label={label}
        >
            <Icon size={18} className="mr-2" />
            {label}
        </button>
    );

    return (
        <div className=" min-h-screen font-sans w-full bg-background">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-gray-700 to-indigo-800 h-56 relative">
                <div className="absolute inset-0 bg-black/30" />
                <div className="container mx-auto px-4 h-full flex items-end">
                    <div className="pb-6 text-primary-foreground z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-muted-foreground font-bold text-2xl border-4 border-white shadow-lg">
                                {provider.businessName.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">{provider.businessName}</h1>
                                <div className="flex items-center gap-4 mt-2">
                                    {provider.averageRating > 0 ? (
                                        <div className="flex items-center">
                                            <Star size={18} fill="currentColor" className="text-amber-400" />
                                            <span className="ml-1 font-medium">{provider.averageRating.toFixed(1)}</span>
                                            <span className="ml-2 text-sm">
                                                ({provider.totalReviews} {provider.totalReviews === 1 ? "review" : "reviews"})
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-primary-foreground bg-gray-500 px-2 py-0.5 rounded text-xs font-medium">
                                            New Provider
                                        </span>
                                    )}
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-1" />
                                        <span>{provider.city}, {provider.state}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="container mx-auto px-4 py-8 bg-background">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">About</h2>
                        <p className="text-zinc-600 mb-6">{provider.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem icon={Clock} label="Working Hours" value={provider.operationHours} />
                            <InfoItem icon={Calendar} label="Joined" value={formatJoinDate(provider.createdAt)} secondaryValue={`(${getJoinedDuration(provider.createdAt)} ago)`} />
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StatusItem icon={Home} condition={provider.acceptsHomeVisits} positiveText="Home Visits Available" negativeText="No Home Visits" />
                            <StatusItem icon={Store} condition={provider.hasPhysicalStore} positiveText="Has a Physical Store" negativeText="No Physical Store" />
                            <StatusItem icon={Shield} condition={provider.isKYCVerified} positiveText="KYC Verified" negativeText="Not KYC Verified" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <ActionButton icon={MessageSquare} label="Message" primary />
                        <ActionButton icon={Share2} label="Share Profile" />
                        <ActionButton icon={Bookmark} label="Save for Later" />
                        <ActionButton icon={CreditCard} label="Hire Now" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDetailsPage;
