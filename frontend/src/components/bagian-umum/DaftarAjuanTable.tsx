'use client';

import { Button } from "@/components/ui/button";
import { useApiData } from "@/hooks/useApi";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/date";

// Tipe data pengajuan
export type Pengajuan = {
  id: number;
  user?: { name: string; nim_nip: string };
  status: string;
  created_at: string;
};

export default function DaftarAjuanTable({ status }: { status: string }) {
  const router = useRouter();
  const { data, isLoading, error } = useApiData<Pengajuan[]>({ 
    endpoint: `/surat?status=${status}` 
  });

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
      header: 'Aksi',
      accessor: 'id' as keyof Pengajuan,
      render: (value: any, row: Pengajuan) => (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => router.push(`/bagian-umum/ajuan-layanan/${row.id}`)}
        >
          Detail
        </Button>
      )
    }
  ];

  return (
    <DataTable
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
}
