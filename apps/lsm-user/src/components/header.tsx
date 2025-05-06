"use client"
import React, { useState } from 'react';
import { Search, Menu, X, MapPin, Phone, User, ShoppingCart, ChevronDown, MessageSquare, Bell } from 'lucide-react';
import { ModeToggle } from './theme-dropdown';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full shadow-md bg-background border-b">
            {/* Top bar with contact info and login */}
            <div className="bg-muted/50 py-2 px-4 md:px-6 text-sm text-muted-foreground">
                <div className="container mx-auto flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span className="hidden sm:inline">Find services near you</span>
                        </span>
                        <span className="hidden md:flex items-center gap-1">
                            <Phone size={14} />
                            <span>(555) 123-4567</span>
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href="/login" className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <User size={14} />
                            <span>Login</span>
                        </a>
                        <a href="/register" className="hidden sm:flex items-center gap-1 hover:text-foreground transition-colors">
                            <User size={14} />
                            <span>Register</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main navigation */}
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/dashboard" className="flex items-center gap-2">
                            <div className="font-bold text-2xl">
                                <span className="bg-primary text-primary-foreground px-2 py-1 rounded">Local</span>
                                <span className="text-foreground">Pro</span>
                            </div>
                        </a>
                    </div>

                    {/* Search bar - hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Find local services..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="/categories" className="flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors">
                            Categories
                            <ChevronDown size={16} />
                        </a>
                        <a href="/providers" className="text-foreground hover:text-muted-foreground transition-colors">Service Providers</a>
                        <a href="/deals" className="text-foreground hover:text-muted-foreground transition-colors">Deals</a>
                        <div className="flex items-center space-x-3">
                            <a href="/messages" className="text-foreground hover:text-muted-foreground transition-colors">
                                <MessageSquare size={20} />
                            </a>
                            <a href="/notifications" className="text-foreground hover:text-muted-foreground transition-colors">
                                <Bell size={20} />
                            </a>
                            <a href="/cart" className="text-foreground hover:text-muted-foreground transition-colors">
                                <ShoppingCart size={20} />
                            </a>
                        </div>
                        <a href="/post-service" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            Post a Service
                        </a>
                        <ModeToggle />
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-foreground hover:text-muted-foreground transition-colors"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile search - visible only on mobile */}
                <div className="mt-4 md:hidden">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Find local services..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                    </div>
                </div>

                {/* Mobile navigation menu */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-4">
                        <a href="/categories" className="block text-foreground hover:text-muted-foreground transition-colors py-2">
                            Categories
                        </a>
                        <a href="/providers" className="block text-foreground hover:text-muted-foreground transition-colors py-2">
                            Service Providers
                        </a>
                        <a href="/deals" className="block text-foreground hover:text-muted-foreground transition-colors py-2">
                            Deals
                        </a>
                        <a href="/messages" className="block text-foreground hover:text-muted-foreground transition-colors py-2">
                            Messages
                        </a>
                        <a href="/notifications" className="block text-foreground hover:text-muted-foreground transition-colors py-2">
                            Notifications
                        </a>
                        <a href="/cart" className="block text-foreground hover:text-muted-foreground transition-colors py-2">
                            Cart
                        </a>
                        <a href="/post-service" className="block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center">
                            Post a Service
                        </a>
                        <ModeToggle />
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;