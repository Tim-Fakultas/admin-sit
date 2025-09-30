"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useApiData } from "@/hooks/useApi";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Pengajuan = {
  id: number;
  user?: { name: string; nim_nip: string };
  status: string;
  created_at: string;
  penanggung_jawab_role_id?: number;
};

export default function DaftarAjuanPage() {
  const { user } = useAuthContext();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useApiData<Pengajuan[]>({
    endpoint: "/surat"
  });

  const columns = [
    { 
      header: 'Nama', 
      accessor: (item: Pengajuan) => item.user?.name || '-' 
    },
    { 
      header: 'NIM', 
      accessor: (item: Pengajuan) => item.user?.nim_nip || '-' 
    },
    { 
      header: 'Status', 
      accessor: (item: Pengajuan) => <StatusBadge status={item.status} size="sm" /> 
    },
    { 
      header: 'Tanggal Pengajuan', 
      accessor: (item: Pengajuan) => new Date(item.created_at).toLocaleDateString('id-ID') 
    }
  ];

  return (
    <PageLayout title="Daftar Pengajuan Mahasiswa">
      <DataTable 
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        emptyMessage="Belum ada pengajuan"
        actions={(item) => (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => router.push(`/daftar-ajuan/${item.id}`)}
          >
            Detail
          </Button>
        )}
      />
    </PageLayout>
  );
}
