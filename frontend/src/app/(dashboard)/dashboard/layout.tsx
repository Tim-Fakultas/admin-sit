// src/app/(dashboard)/layout.tsx
'use client'; // <-- Wajib diubah menjadi Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // 1. Periksa apakah ada token di localStorage saat komponen dimuat
        const token = localStorage.getItem('auth_token');

        // 2. Jika tidak ada token, "lempar" pengguna kembali ke halaman login
        if (!token) {
            router.push('/login');
        } else {
            // 3. Jika ada token, izinkan komponen untuk ditampilkan
            setIsChecking(false);
        }
    }, [router]);

    // Selama pengecekan, tampilkan pesan loading
    if (isChecking) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    // Jika pengecekan selesai dan token ada, tampilkan layout dashboard
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}