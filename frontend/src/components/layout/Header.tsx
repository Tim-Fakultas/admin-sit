'use client';

import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext'; // <-- Gunakan context
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

// Fungsi kecil untuk mendapatkan inisial dari nama
const getInitials = (name: string): string => {
    if (!name) return '??';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase().substring(0, 2);
};

export function Header() {
    // Ambil data user dan fungsi logout dari "papan pengumuman" global
    const { user, logout } = useAuthContext();

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

            <div className="flex items-center space-x-4">
                <Button onClick={logout} variant="ghost" className="hover:bg-blue-700">
                    <LogOut className="h-5 w-5 mr-2" />
                    Keluar
                </Button>
                <Avatar>
                    <AvatarImage src="/avatar-profil.png" alt="Foto Profil" />
                    <AvatarFallback>
                        {user ? getInitials(user.name) : '??'}
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}