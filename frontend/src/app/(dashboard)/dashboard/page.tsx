'use client';

interface StatsData {
  total_pengajuan: number;
  sudah_acc: number;
  tolak_acc: number;
  perbaikan: number;
}

import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import apiClient from "@/lib/api";

// ... Komponen StatCard dan StatsData tetap ...

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const router = useRouter();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect berdasarkan role
    if (!isAuthLoading && user) {
      if (user.role.slug === "bagian-umum") {
        router.replace("/bagian-umum");
      }
      // Tambah role lain jika perlu
    }
  }, [user, isAuthLoading, router]);

  // Jangan render dashboard jika bagian-umum, tunggu redirect
  if (!isAuthLoading && user?.role?.slug === "bagian-umum") {
    return null;
  }

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
  }, []);

  return (
    <div className="space-y-6">
      {/* Kartu Judul */}
      <Card className="bg-blue-600 text-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <p className="text-blue-100">Selamat Datang Di Aplikasi Layanan Akademik Mahasiswa</p>
        </CardHeader>
      </Card>
      {/* ...existing code... */}
    </div>
  );
}