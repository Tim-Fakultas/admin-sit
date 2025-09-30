'use client';

import { useApiData } from "@/hooks/useApi";
import { DataTable } from "@/components/common/DataTable";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";

interface Pengajuan {
  id: number;
  user?: { name: string; nim_nip: string };
  status: string;
  created_at: string;
}

export default function DaftarAjuanPage() {
  const { data, isLoading, error } = useApiData<Pengajuan[]>({ endpoint: "/surat" });

  const columns = [
    { 
      header: 'No', 
      accessor: 'id' as keyof Pengajuan, 
      render: (_: any, __: any, index: number) => index + 1 
    },
    { 
      header: 'Nama', 
      accessor: 'user' as keyof Pengajuan, 
      render: (value: any, row: Pengajuan) => row.user?.name || '-' 
    },
    { 
      header: 'NIM', 
      accessor: 'user' as keyof Pengajuan, 
      render: (value: any, row: Pengajuan) => row.user?.nim_nip || '-' 
    },
    { 
      header: 'Status', 
      accessor: 'status' as keyof Pengajuan, 
      render: (value: string) => <StatusBadge status={value} /> 
    },
    { 
      header: 'Tanggal Pengajuan', 
      accessor: 'created_at' as keyof Pengajuan, 
      render: (value: string) => formatDate(value) 
    },
    {
      header: 'Tools',
      accessor: 'id' as keyof Pengajuan,
      render: (value: any, row: Pengajuan) => (
        <Button size="sm" variant="outline">
          Detail
        </Button>
      )
    }
  ];

  return (
    <PageLayout title="Daftar Pengajuan Mahasiswa">
      <DataTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        error={error}
      />
    </PageLayout>
  );
}
