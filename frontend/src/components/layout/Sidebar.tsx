// src/components/layout/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Files } from "lucide-react";

function cn(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", icon: Home, label: "Dashboard" },
        { href: "/pengajuan", icon: FileText, label: "Pengajuan Layanan" },
        { href: "/daftar-ajuan", icon: Files, label: "Daftar Ajuan" },
    ];

    return (
        // Kembalikan warna menjadi putih
        <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
            <nav className="flex-grow p-4">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={cn(
                                "flex items-center p-3 my-1 rounded-lg text-gray-700 hover:bg-blue-50",
                                // Gaya link aktif yang baru
                                pathname === item.href ? "bg-blue-100 text-blue-700 font-semibold" : ""
                            )}>

                                <item.icon className="h-5 w-5 mr-3" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}