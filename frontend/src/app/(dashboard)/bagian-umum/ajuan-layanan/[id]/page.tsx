'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/api";
import { SuratDetail } from "@/types"; // <-- Gunakan tipe baru
import { DetailMahasiswa } from "@/components/ajuan/detail/DetailMahasiswa";
import { DetailLampiran } from "@/components/ajuan/detail/DetailLampiran";
import { AksiPejabat } from "@/components/ajuan/detail/AksiPejabat";

export default function DetailAjuanLayananPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<SuratDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      apiClient.get(`/surat/${id}`)
        .then(res => setData(res.data))
        .catch(() => setError("Gagal memuat detail pengajuan."))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="text-center p-10">Loading detail...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Detail Pengajuan: {data.jenis_surat.name}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <DetailMahasiswa user={data.user} />
        <DetailLampiran data={data} />
      </div>

      <AksiPejabat suratId={data.id} />
    </div>
  );
}