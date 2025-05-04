"use client"
import React, { useState } from 'react';
import { Search, Menu, X, MapPin, Phone, User, ShoppingCart, ChevronDown, MessageSquare, Bell } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full shadow-md bg-white">
            {/* Top bar with contact info and login */}
            <div className="bg-gray-50 py-2 px-4 md:px-6 text-sm text-gray-600">
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
                        <a href="/login" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                            <User size={14} />
                            <span>Login</span>
                        </a>
                        <a href="/register" className="hidden sm:flex items-center gap-1 hover:text-gray-600 transition-colors">
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
                            <div className="text-gray-600 font-bold text-2xl">
                                <span className="bg-gray-600 text-white px-2 py-1 rounded">Local</span>
                                <span className="text-gray-600">Pro</span>
                            </div>
                        </a>
                    </div>

                    {/* Search bar - hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Find local services..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="/categories" className="flex items-center gap-1 text-gray-700 hover:text-gray-600 transition-colors">
                            Categories
                            <ChevronDown size={16} />
                        </a>
                        <a href="/providers" className="text-gray-700 hover:text-gray-600 transition-colors">Service Providers</a>
                        <a href="/deals" className="text-gray-700 hover:text-gray-600 transition-colors">Deals</a>
                        <div className="flex items-center space-x-3">
                            <a href="/messages" className="text-gray-700 hover:text-gray-600 transition-colors">
                                <MessageSquare size={20} />
                            </a>
                            <a href="/notifications" className="text-gray-700 hover:text-gray-600 transition-colors">
                                <Bell size={20} />
                            </a>
                            <a href="/cart" className="text-gray-700 hover:text-gray-600 transition-colors">
                                <ShoppingCart size={20} />
                            </a>
                        </div>
                        <a href="/post-service" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Post a Service
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-600 transition-colors"
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
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Mobile navigation menu */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-4">
                        <a href="/categories" className="block text-gray-700 hover:text-gray-600 transition-colors py-2">
                            Categories
                        </a>
                        <a href="/providers" className="block text-gray-700 hover:text-gray-600 transition-colors py-2">
                            Service Providers
                        </a>
                        <a href="/deals" className="block text-gray-700 hover:text-gray-600 transition-colors py-2">
                            Deals
                        </a>
                        <a href="/messages" className="block text-gray-700 hover:text-gray-600 transition-colors py-2">
                            Messages
                        </a>
                        <a href="/notifications" className="block text-gray-700 hover:text-gray-600 transition-colors py-2">
                            Notifications
                        </a>
                        <a href="/cart" className="block text-gray-700 hover:text-gray-600 transition-colors py-2">
                            Cart
                        </a>
                        <a href="/post-service" className="block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-center">
                            Post a Service
                        </a>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;