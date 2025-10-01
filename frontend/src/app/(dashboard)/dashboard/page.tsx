'use client';

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiData } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, CheckCircle2, XCircle, RefreshCw, Clock } from "lucide-react";
import { LoadingState, ErrorState } from "@/components/common/States";
import { DashboardStats } from "@/types";
import { ROLES } from "@/lib/config";

interface StatsData {
  total_pengajuan: number;
  sudah_acc: number;
  tolak_acc: number;
  perbaikan: number;
  pending: number;
}

// Komponen StatCard dengan design standar dan clean
function StatCard({ title, value, icon: Icon, bgColor }: {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  bgColor: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 ${bgColor}/10 rounded-lg`}>
            <Icon className={`h-6 w-6 ${bgColor.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const router = useRouter();
  const { data: stats, isLoading, error } = useApiData<DashboardStats>({
    endpoint: '/dashboard/stats'
  });

  useEffect(() => {
    // Redirect berdasarkan role dengan type safety
    if (!isAuthLoading && user) {
      if (user.role.slug === ROLES.BAGIAN_UMUM) {
        router.replace("/bagian-umum");
      }
      // Tambah role lain jika perlu
    }
  }, [user, isAuthLoading, router]);

  // Jangan render dashboard jika bagian-umum, tunggu redirect
  if (!isAuthLoading && user?.role?.slug === ROLES.BAGIAN_UMUM) {
    return null;
  }

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      {/* Header Card dengan design yang diperbaiki */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg py-8">
          <div className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Dashboard</CardTitle>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Selamat Datang Di Aplikasi Layanan Akademik Mahasiswa
            </p>
            <div className="mt-4 w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
          </div>
        </CardHeader>
      </Card>

      {/* Kartu Statistik dengan tema purple yang konsisten */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Pengajuan"
          value={stats?.total_pengajuan || 0}
          icon={FilePlus2}
          bgColor="bg-purple-600"
        />
        <StatCard
          title="Menunggu Proses"
          value={stats?.pending || 0}
          icon={Clock}
          bgColor="bg-indigo-500"
        />
        <StatCard
          title="Sudah ACC"
          value={stats?.sudah_acc || 0}
          icon={CheckCircle2}
          bgColor="bg-purple-500"
        />
        <StatCard
          title="Ditolak"
          value={stats?.tolak_acc || 0}
          icon={XCircle}
          bgColor="bg-purple-700"
        />
        <StatCard
          title="Perlu Perbaikan"
          value={stats?.perbaikan || 0}
          icon={RefreshCw}
          bgColor="bg-indigo-600"
        />
      </div>
    </div>
  );
}