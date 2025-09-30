'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DetailMahasiswa } from "@/components/ajuan/detail/DetailMahasiswa";
import { DetailLampiran } from "@/components/ajuan/detail/DetailLampiran";
import { AksiPejabat } from "@/components/ajuan/detail/AksiPejabat";
import apiClient from "@/lib/api";
import { SuratDetail } from "@/types";

export default function SuratDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Dapatkan id langsung dari params

  const [data, setData] = useState<SuratDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Pastikan 'id' ada sebelum mengambil data
    if (id) {
      async function fetchData() {
        try {
          const resSurat = await apiClient.get(`/surat/${id}`);
          setData(resSurat.data);
        } catch (err) {
          setError("Gagal memuat data detail pengajuan.");
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }
  }, [id]); // useEffect akan berjalan setiap kali 'id' berubah

  if (isLoading) return <div className="text-center p-10">Loading detail...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!data) return <div className="text-center p-10">Data pengajuan tidak ditemukan.</div>;

  // Cek apakah user yang sedang login adalah pejabat (bukan mahasiswa)
  // Sebaiknya gunakan AuthContext untuk mendapatkan user yang login saat ini
  const showAksi = data.user?.role?.slug !== "mahasiswa"; 

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Pengajuan: {data.jenis_surat.name}</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-6">
        <DetailMahasiswa user={data.user} />
        <DetailLampiran data={data} />
      </div>

      {/* Tampilkan tombol aksi hanya untuk pejabat */}
      {showAksi && <AksiPejabat suratId={data.id} />}
    </div>
  );
}