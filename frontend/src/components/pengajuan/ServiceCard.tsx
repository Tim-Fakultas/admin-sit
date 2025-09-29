// src/components/pengajuan/ServiceCard.tsx

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import Link from "next/link"; // <-- Pastikan Link diimpor

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

export function ServiceCard({ title, description, icon: Icon, href }: ServiceCardProps) {
    // Seluruh komponen dibungkus dengan <Link>
    return (
        <Link href={href} className="block h-full">
            <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 h-full">
                <CardHeader className="items-center text-center p-6">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="mt-2">{description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}