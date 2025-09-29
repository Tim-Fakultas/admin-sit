// src/contexts/AuthContext.tsx
'use client';

import apiClient from '@/lib/api';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User { name: string; /* ...properti user lainnya... */ }
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (nim_nip: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setIsLoading(false);

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'auth_token' && !event.newValue) {
                setUser(null);
                router.push('/login');
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [router]);

    const login = async (nim_nip: string, password: string) => {
        const response = await apiClient.post('/login', { nim_nip, password });
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        router.push('/dashboard');
    };

    const logout = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try { await apiClient.post('/logout'); }
            catch (error) { console.error('API Logout Gagal:', error); }
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    const value = { user, isLoading, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}