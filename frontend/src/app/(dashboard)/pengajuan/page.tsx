'use client';

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { ServiceCard } from "@/components/pengajuan/ServiceCard";
// 1. Impor tipe 'LucideIcon' dari lucide-react
import { FileText, GraduationCap, PenSquare, Globe, Wrench, Package, type LucideIcon } from "lucide-react";
import { JenisSurat as JenisSuratType } from "@/types";

// 2. Ubah tipe di sini dari ElementType menjadi LucideIcon
const iconMap: { [key: string]: LucideIcon } = {
    default: FileText,
    "Surat Rekomendasi Magang": Package,
    "Surat Keterangan Aktif Kuliah": GraduationCap,
    "Perubahan Judul Tesis": PenSquare,
    "Tambah/Hapus Mata Kuliah": GraduationCap,
    "Layanan Skripsi": FileText,
    "Cuti Akademik": Globe,
    "Peminjaman Peralatan": Wrench,
    "Dokumen Mahasiswa": Package,
};

export default function PengajuanPage() {
    const [services, setServices] = useState<JenisSuratType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await apiClient.get('/jenis-surat');
                setServices(response.data);
            } catch (error) {
                console.error("Gagal mengambil daftar layanan:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (isLoading) {
        return <div className="text-center p-10">Loading daftar layanan...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Pilih Jenis Layanan Akademik</h1>
                <p className="text-muted-foreground mt-2">
                    Telusuri dan pilih layanan akademik yang Anda perlukan. Setelah memilih, Anda akan diarahkan untuk mengisi detail pengajuan.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        title={service.name}
                        description={service.description}
                        icon={iconMap[service.name] || iconMap.default}
                        href={`/pengajuan/${service.id}`}
                    />
                ))}
            </div>
        </div>
    );
}