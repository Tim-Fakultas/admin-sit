'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DetailMahasiswa } from "@/components/ajuan/detail/DetailMahasiswa";
import { DetailLampiran } from "@/components/ajuan/detail/DetailLampiran";
import { AksiPejabat } from "@/components/ajuan/detail/AksiPejabat";
import { PDFViewer } from "@/components/ajuan/detail/PDFViewer";
import { useAuthContext } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";
import { SuratDetail } from "@/types";

export default function SuratDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuthContext();

  const [data, setData] = useState<SuratDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
  }, [id]);

  if (isLoading) return <div className="text-center p-10">Loading detail...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!data) return <div className="text-center p-10">Data pengajuan tidak ditemukan.</div>;

  // Logika tampilan berdasarkan user context dari backend
  const userContext = data.user_context || {
    role: user?.role?.slug || '',
    can_paraf: false,
    can_tolak: false,
    show_pdf_only: false,
    show_form_data: true
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {userContext.show_pdf_only ? 'Surat Keterangan' : 'Detail Pengajuan'}: {data.jenis_surat.name}
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>

      {/* Status badge */}
      <div className="mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          data.status === 'disetujui' ? 'bg-green-100 text-green-800' :
          data.status === 'diajukan' ? 'bg-yellow-100 text-yellow-800' :
          data.status === 'ditolak' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </span>
      </div>

      {/* Tampilan PDF untuk mahasiswa yang sudah disetujui atau pejabat */}
      {userContext.show_pdf_only && data.file_path ? (
        <div className="space-y-6">
          <PDFViewer 
            filePath={data.file_path} 
            suratId={data.id}
            title={`Surat ${data.jenis_surat.name}`}
          />
          
          {/* Show aksi for officers */}
          {(userContext.can_paraf || userContext.can_tolak) && (
            <AksiPejabat suratId={data.id} userContext={userContext} />
          )}
        </div>
      ) : (
        /* Tampilan form data untuk bagian umum dan mahasiswa yang belum selesai */
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <DetailMahasiswa user={data.user} />
            <DetailLampiran data={data} showFormData={userContext.show_form_data} />
          </div>

          {/* Show aksi for officers */}
          {(userContext.can_paraf || userContext.can_tolak) && (
            <AksiPejabat suratId={data.id} userContext={userContext} />
          )}
        </div>
      )}
    </div>
  );
}