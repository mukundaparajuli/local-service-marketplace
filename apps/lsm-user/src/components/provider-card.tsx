import React from 'react';
import { Star, MapPin, Home, Store, Shield, Calendar } from 'lucide-react';

const ProviderCard = ({ provider }: { provider: any }) => {
    const formatDate = (dateString: string) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getJoinedDate = (dateString: string) => {
        const joinDate = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - joinDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months > 1 ? 's' : ''}`;
        }
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''}`;
    };

    return (
        <div className="bg-background rounded-xl shadow-md hover:shadow-xl border border-border transition-shadow duration-300 max-w-sm">
            {/* Header section */}
            <div className="h-32 bg-gradient-to-r from-secondary to-secondary-foreground relative">
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-primary-foreground font-semibold text-lg">{provider.businessName}</h3>
                    <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                            <Star size={16} fill="currentColor" className="mr-1" />
                            <span className="text-sm text-primary-foreground">
                                {provider.averageRating > 0 ? provider.averageRating.toFixed(1) : "New"}
                            </span>
                        </div>
                        <span className="text-sm text-muted ml-2">
                            ({provider.totalReviews} {provider.totalReviews === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                </div>
            </div>

            {/* Details section */}
            <div className="p-4 text-sm text-foreground">
                {/* Location */}
                <div className="flex items-start mb-3">
                    <MapPin size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="ml-2">{provider.city}, {provider.state}</span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2 min-h-[3rem]">
                    {provider.description || "No description provided."}
                </p>

                {/* Services */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                        <Home size={16} className={`mr-2 ${provider.acceptsHomeVisits ? 'text-green-600' : 'text-muted-foreground/50'}`} />
                        <span className={`${provider.acceptsHomeVisits ? 'text-foreground' : 'text-muted-foreground/70'}`}>
                            {provider.acceptsHomeVisits ? 'Home visits' : 'No home visits'}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Store size={16} className={`mr-2 ${provider.hasPhysicalStore ? 'text-green-600' : 'text-muted-foreground/50'}`} />
                        <span className={`${provider.hasPhysicalStore ? 'text-foreground' : 'text-muted-foreground/70'}`}>
                            {provider.hasPhysicalStore ? 'Physical store' : 'No physical store'}
                        </span>
                    </div>
                </div>

                {/* Footer info */}
                <div className="flex justify-between items-center pt-3 border-t border-border/50">
                    <div className="flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-1" />
                        <span>Joined {getJoinedDate(provider.createdAt)} ago</span>
                    </div>
                    <div className="flex items-center">
                        <Shield size={16} className={`mr-1 ${provider.isKYCVerified ? 'text-green-600' : 'text-muted-foreground/50'}`} />
                        <span className={`${provider.isKYCVerified ? 'text-green-600' : 'text-muted-foreground/50'}`}>
                            {provider.isKYCVerified ? 'Verified' : 'Unverified'}
                        </span>
                    </div>
                </div>

                <button className="mt-5 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors text-sm font-medium"
                    onClick={() => {
                        window.location.href = `/dashboard/provider/${provider.id}`;
                    }
                    }
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default ProviderCard;