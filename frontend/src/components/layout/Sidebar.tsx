// src/components/layout/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Files } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        <aside className="w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">Logo UIN</h1>
            </div>
            <nav className="flex-grow p-4">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={cn(
                                "flex items-center p-3 my-1 rounded-lg font-medium text-gray-600 hover:bg-gray-200",
                                pathname === item.href && "bg-blue-600 text-white hover:bg-blue-700"
                            )}>

                                <item.icon className="h-5 w-5 mr-3" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Avatar di bagian bawah sidebar */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                    {/* Anda bisa menambahkan nama user di sini nanti */}
                </div>
            </div>
        </aside>
    );
}