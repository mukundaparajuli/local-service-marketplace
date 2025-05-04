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
        const diffDays = Math.ceil(Math.abs(now - joinDate) / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} days`;
        const months = Math.floor(diffDays / 30);
        if (diffDays < 365) return `${months} month${months > 1 ? "s" : ""}`;
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? "s" : ""}`;
    };

    // Reusable Components
    const RatingStars = ({ rating }) => (
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
            <span
                className={`ml-2 ${condition ? "text-zinc-700" : "text-zinc-500"}`}
            >
                {condition ? positiveText : negativeText}
            </span>
        </div>
    );

    const ActionButton = ({ icon: Icon, label, primary = false }: { icon: any, label: string, primary?: boolean }) => (
        <button
            className={`w-full py-2.5 rounded-lg flex items-center justify-center transition-all duration-200 ${primary
                ? "bg-gray-600 text-white hover:bg-gray-700"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
            aria-label={label}
        >
            <Icon size={18} className="mr-2" />
            {label}
        </button>
    );

    return (
        <div className="bg-zinc-100 min-h-screen font-sans w-full">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-gray-700 to-indigo-800 h-56 relative">
                <div className="absolute inset-0 bg-black/30" />
                <div className="container mx-auto px-4 h-full flex items-end">
                    <div className="pb-6 text-white z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-600 font-bold text-2xl border-4 border-white shadow-lg">
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
                                        <span className="text-white bg-gray-500 px-2 py-0.5 rounded text-xs font-medium">
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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Provider Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-zinc-800 mb-4">Provider Information</h2>
                            <div className="space-y-5">
                                <InfoItem
                                    icon={MapPin}
                                    label={`${provider.city}, ${provider.state}`}
                                    value={provider.address}
                                />
                                <InfoItem
                                    icon={Calendar}
                                    label={`Member since ${formatJoinDate(provider.createdAt)}`}
                                    value={`${getJoinedDuration(provider.createdAt)} on platform`}
                                />
                                <InfoItem
                                    icon={Clock}
                                    label="Operating Hours"
                                    value={provider.operatingHours || "Not specified"}
                                />
                                <div className="pt-4 border-t border-zinc-200 space-y-3">
                                    <StatusItem
                                        icon={Home}
                                        condition={provider.acceptsHomeVisits}
                                        positiveText="Makes home visits"
                                        negativeText="No home visits"
                                    />
                                    <StatusItem
                                        icon={Store}
                                        condition={provider.hasPhysicalStore}
                                        positiveText="Has physical store"
                                        negativeText="No physical store"
                                    />
                                    <StatusItem
                                        icon={Shield}
                                        condition={provider.isKYCVerified}
                                        positiveText="Identity verified"
                                        negativeText="Not verified"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-zinc-800 mb-4">Contact Information</h2>
                            <div className="space-y-3">
                                <ActionButton icon={Phone} label="Contact Provider" primary />
                                <ActionButton icon={MessageSquare} label="Send Message" />
                                <ActionButton icon={Share2} label="Share Profile" />
                                <ActionButton icon={Bookmark} label="Save Provider" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Services and Reviews */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-zinc-800 mb-3">About</h2>
                            <p className="text-zinc-600">
                                {provider.description || "This provider has not added a description yet."}
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="flex border-b border-zinc-200">
                                {["services", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${activeTab === tab
                                            ? "text-gray-600 border-b-2 border-gray-600"
                                            : "text-zinc-500 hover:text-zinc-700"
                                            }`}
                                        onClick={() => setActiveTab(tab)}
                                        aria-selected={activeTab === tab}
                                        role="tab"
                                    >
                                        {tab === "services" ? "Services" : `Reviews (${provider.totalReviews})`}
                                    </button>
                                ))}
                            </div>

                            {/* Services Tab Content */}
                            {activeTab === "services" && (
                                <div className="p-6">
                                    {services.length > 0 ? (
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-medium text-zinc-800">Available Services</h3>
                                                <button
                                                    className="flex items-center text-gray-600 text-sm font-medium hover:text-gray-700 transition"
                                                    aria-label="Filter services"
                                                >
                                                    <Filter size={16} className="mr-1" />
                                                    Filter
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                {services.map((service) => (
                                                    <div
                                                        key={service.id}
                                                        className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                                                    >
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <h4 className="font-medium text-zinc-800">{service.title}</h4>
                                                                <p className="text-sm text-zinc-500 mt-1">{service.category}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-semibold text-zinc-800">NPR {service.price}</p>
                                                                <div className="flex items-center mt-1 justify-end">
                                                                    <Star size={14} fill="currentColor" className="text-amber-400" />
                                                                    <span className="ml-1 text-sm text-zinc-600">{service.rating}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 flex justify-between items-center">
                                                            <span className="text-sm text-zinc-500">1 hour</span>
                                                            <button
                                                                className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center"
                                                                aria-label={`View details for ${service.title}`}
                                                            >
                                                                View Details
                                                                <ChevronRight size={14} className="ml-1" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-zinc-500">This provider hasn't added any services yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Reviews Tab Content */}
                            {activeTab === "reviews" && (
                                <div className="p-6">
                                    {reviews.length > 0 ? (
                                        <div>
                                            <h3 className="font-medium text-zinc-800 mb-4">Customer Reviews</h3>
                                            <div className="space-y-6">
                                                {reviews.map((review) => (
                                                    <div
                                                        key={review.id}
                                                        className="border-b border-zinc-200 pb-4 last:border-b-0 last:pb-0"
                                                    >
                                                        <div className="flex items-start">
                                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm mr-3">
                                                                {review.user.charAt(0)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between">
                                                                    <div>
                                                                        <h4 className="font-medium text-zinc-800">{review.user}</h4>
                                                                        <div className="flex items-center mt-1">
                                                                            <RatingStars rating={review.rating} />
                                                                            <span className="ml-2 text-sm text-zinc-500">
                                                                                {new Date(review.date).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-2 text-zinc-600">{review.comment}</p>
                                                                <div className="mt-2">
                                                                    <button
                                                                        className="flex items-center text-zinc-500 hover:text-gray-600 text-sm transition"
                                                                        aria-label={`Mark ${review.comment} as helpful`}
                                                                    >
                                                                        <ThumbsUp size={14} className="mr-1" />
                                                                        <span>Helpful ({review.liked})</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-zinc-500">No reviews yet for this provider.</p>
                                            <button
                                                className="mt-3 text-gray-600 font-medium hover:text-gray-700 transition"
                                                aria-label="Leave a review"
                                            >
                                                Be the first to leave a review
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-zinc-800 mb-3">Payment Methods</h2>
                            <div className="flex flex-wrap gap-3">
                                {["Cash on Delivery", "Online Payment"].map((method) => (
                                    <div
                                        key={method}
                                        className="flex items-center bg-zinc-100 rounded px-3 py-1.5"
                                    >
                                        <CreditCard size={16} className="text-zinc-600 mr-2" />
                                        <span className="text-zinc-700 text-sm">{method}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDetailsPage;