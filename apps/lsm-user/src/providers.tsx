'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './contexts/auth-context';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <Toaster />
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
}
