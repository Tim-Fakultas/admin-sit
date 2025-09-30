// src/components/layout/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Files } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

function cn(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuthContext();

    let navItems;
    if (user?.role?.slug === "mahasiswa") {
        navItems = [
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/pengajuan", icon: FileText, label: "Pengajuan Layanan" },
            { href: "/daftar-ajuan", icon: Files, label: "Daftar Ajuan" },
        ];
    } else {
        // Officer nav
        navItems = [
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/daftar-ajuan", icon: Files, label: "Daftar Ajuan" },
        ];
    }

    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
            <nav className="flex-grow p-4">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={cn(
                                "flex items-center p-3 my-1 rounded-lg text-gray-700 hover:bg-blue-50",
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