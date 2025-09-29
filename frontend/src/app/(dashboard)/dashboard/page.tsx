// src/app/(dashboard)/dashboard/page.tsx
'use client'; // <-- Wajib jadi Client Component untuk fetch data

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import apiClient from "@/lib/api"; // <-- Impor jembatan API kita

// ... Komponen StatCard (tidak perlu diubah) ...
function StatCard({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) {
    return (
        <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
            </CardContent>
        </Card>
    );
}

// Tipe data untuk state statistik
interface StatsData {
    total_pengajuan: number;
    sudah_acc: number;
    tolak_acc: number;
    perbaikan: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fungsi untuk mengambil data dari backend
        const fetchStats = async () => {
            try {
                const response = await apiClient.get('/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Gagal mengambil data statistik:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []); // [] berarti useEffect hanya berjalan sekali saat komponen dimuat

    return (
        <div className="space-y-6">
            {/* Kartu Judul */}
            <Card className="bg-blue-600 text-white shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Dashboard</CardTitle>
                    <p className="text-blue-100">Selamat Datang Di Aplikasi Layanan Akademik Mahasiswa</p>
                </CardHeader>
            </Card>

            {/* Kartu Statistik */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Pengajuan" value={isLoading ? '...' : stats?.total_pengajuan ?? 0} icon={FilePlus2} />
                <StatCard title="Diterima" value={isLoading ? '...' : stats?.sudah_acc ?? 0} icon={CheckCircle2} />
                <StatCard title="Ditolak" value={isLoading ? '...' : stats?.tolak_acc ?? 0} icon={XCircle} />
                <StatCard title="Perbaikan" value={isLoading ? '...' : stats?.perbaikan ?? 0} icon={RefreshCw} />
            </div>

            {/* Kartu Petunjuk */}
            <Card className="shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-gray-800">Petunjuk penggunaan aplikasi</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                    <p>1. Untuk Pengajuan laporan silakan klik menu pengajuan</p>
                    <p>2. kemudian klik jenis layanan yang akan diajukan</p>
                    <p>3. kemudian masukan syarat sesuai dengan form yang diminta</p>
                    <p>4. jika sudah mengajukan silakan menunggu verifikasi admin</p>
                    <p>5. Setelah verifikasi jika ditolak dengan perbaikan silakan melengkapi syarat sesuai dengan yang diminta jangan input ulang</p>
                    <p>6. setalh diacc silakan cetak bukti acc dan dikumpulkan sesuai kebijakan fakultas masing-masing</p>
                </CardContent>
            </Card>
        </div>
    );
}