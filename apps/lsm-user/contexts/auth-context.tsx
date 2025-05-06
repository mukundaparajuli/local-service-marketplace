import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getMyProfile } from '../actions/get-myprofile';
import { login } from '../actions/login';
import { logout } from '../actions/logout';

import { User } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: { identifier: string; password: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getMyProfile();
                setUser(userProfile);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const loginUser = async (credentials: { identifier: string; password: string }) => {
        try {
            const user = await login(credentials)
            setUser(user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };


    const logoutUser = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const value = {
        user,
        login,
        logout,
    };

    if (loading) {
        return <div>Loading...</div>; // Replace with your loading component
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