'use client';

import { useApiData } from "@/hooks/useApi";
import { PageLayout } from "@/components/layout/PageLayout";
import { LoadingState, ErrorState } from "@/components/common/States";
import { ServiceCard } from "@/components/pengajuan/ServiceCard";
import { FileText, GraduationCap, PenSquare, Globe, Wrench, Package, type LucideIcon } from "lucide-react";
import { JenisSurat as JenisSuratType } from "@/types";

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
    const { data: services, isLoading, error, refetch } = useApiData<JenisSuratType[]>({
        endpoint: '/jenis-surat',
        initialData: []
    });

    if (isLoading) return <LoadingState message="Loading daftar layanan..." />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;

    return (
        <PageLayout 
            title="Pilih Jenis Layanan Akademik" 
            subtitle="Telusuri dan pilih layanan akademik yang Anda perlukan. Setelah memilih, Anda akan diarahkan untuk mengisi detail pengajuan."
        >
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
        </PageLayout>
    );
}