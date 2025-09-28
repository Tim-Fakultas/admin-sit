// src/components/layout/Header.tsx
'use client'; // <-- Pastikan ini ada

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import apiClient from "@/lib/api"; // <-- Impor apiClient

export function Header() {
    const router = useRouter(); // <-- Hook untuk navigasi

    // Fungsi yang akan dijalankan saat tombol "Keluar" di-klik
    const handleLogout = async () => {
        try {
            // Panggil API logout di backend
            await apiClient.post('/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            // Apapun yang terjadi (berhasil atau gagal), hapus data sesi dari browser
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            // Arahkan kembali ke halaman login
            router.push('/login');
        }
    };

    return (
        <header className="h-16 bg-white text-gray-800 flex items-center justify-between px-6 border-b">
            <div>
                <h1 className="text-lg font-semibold">UIN Raden Fatah Palembang</h1>
            </div>
            <div className="flex items-center space-x-4">
                {/* Tambahkan onClick ke tombol ini */}
                <Button onClick={handleLogout} variant="ghost" className="text-gray-600 hover:bg-gray-100">
                    <LogOut className="h-5 w-5 mr-2" />
                    Keluar
                </Button>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}