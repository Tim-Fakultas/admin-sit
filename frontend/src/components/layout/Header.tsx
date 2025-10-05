'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User, ChevronDown } from "lucide-react";

// Fungsi kecil untuk mendapatkan inisial dari nama
const getInitials = (name: string): string => {
    if (!name) return '??';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase().substring(0, 2);
};

export function Header() {
    const { user, logout } = useAuthContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="h-16 bg-primary text-primary-foreground flex items-center justify-between px-6 z-10 shadow-md">
            <div className="flex items-center space-x-3">
                <Image
                    src="/UINdanBLU.png"
                    alt="Logo UIN Raden Fatah"
                    width={90}
                    height={75}
                />
                <h1 className="text-lg font-semibold">UIN Raden Fatah Palembang</h1>
            </div>

            <div className="flex items-center space-x-4 relative">
                <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 hover:bg-blue-700"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar-profil.png" alt="Foto Profil" />
                        <AvatarFallback className="text-black">
                            {user ? getInitials(user.name) : '??'}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>

                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white text-black rounded-md shadow-lg border z-50">
                        <div className="p-3 border-b">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.nim_nip}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        
                        <div className="py-1">
                            <Link 
                                href="/profile" 
                                className="flex items-center px-3 py-2 text-sm hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>Profil Saya</span>
                            </Link>
                        </div>
                        
                        <div className="border-t py-1">
                            <button 
                                onClick={() => {
                                    logout();
                                    setIsDropdownOpen(false);
                                }}
                                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Keluar</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}