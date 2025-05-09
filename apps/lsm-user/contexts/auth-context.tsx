"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getMyProfile } from '../actions/get-myprofile';
import { login } from '../actions/login';
import { logout } from '../actions/logout';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { identifier: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setError(null);
                const userProfile = await getMyProfile();
                setUser(userProfile);
            } catch (error: any) {
                console.error('Failed to fetch user profile:', error);
                setError(error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const loginUser = async (credentials: { identifier: string; password: string }) => {
        try {
            setLoading(true);
            setError(null);
            const user = await login(credentials);
            setUser(user);
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        try {
            setLoading(true);
            setError(null);
            await logout();
            setUser(null);
        } catch (error: any) {
            console.error('Logout error:', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        error,
        login: loginUser,
        logout: logoutUser,
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};