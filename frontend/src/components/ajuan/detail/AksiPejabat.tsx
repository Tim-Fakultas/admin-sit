// src/components/ajuan/detail/AksiPejabat.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";

interface AksiPejabatProps {
  suratId: number;
  userContext: {
    role: string;
    can_paraf: boolean;
    can_tolak: boolean;
    show_pdf_only: boolean;
    show_form_data: boolean;
  };
}

export function AksiPejabat({ suratId, userContext }: AksiPejabatProps) {
  const router = useRouter();
  const [catatan, setCatatan] = useState("");
  const [showCatatan, setShowCatatan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleParaf = async () => {
    setIsLoading(true);
    try {
      await apiClient.put(`/surat/${suratId}/paraf`);
      alert('Surat berhasil diparaf dan diteruskan ke pejabat berikutnya.');
      router.back(); // Kembali ke daftar setelah paraf
    } catch (error: any) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.message || 'Gagal memparaf surat.';
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTolak = async () => {
    if (!catatan.trim()) {
      alert('Mohon berikan catatan untuk penolakan.');
      return;
    }
    
    setIsLoading(true);
    try {
      await apiClient.put(`/surat/${suratId}/tolak`, { catatan });
      alert('Surat berhasil ditolak.');
      setShowCatatan(false);
      setCatatan('');
      router.back(); // Kembali ke daftar setelah tolak
    } catch (error: any) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.message || 'Gagal menolak surat.';
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Jika user context menunjukkan tidak bisa aksi, tampilkan hanya tombol kembali
  if (!userContext.can_paraf && !userContext.can_tolak) {
    return (
      <div className="mt-6">
        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        {userContext.can_paraf && (
          <Button onClick={handleParaf} disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Paraf & Lanjutkan'}
          </Button>
        )}
        {userContext.can_tolak && (
          <Button 
            variant="destructive" 
            onClick={() => setShowCatatan(!showCatatan)}
            disabled={isLoading}
          >
            Tolak / Minta Perbaikan
          </Button>
        )}
        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>
      {showCatatan && (
        <div className="mt-4 p-4 border rounded-md">
          <label className="block mb-2 font-medium">Catatan Penolakan / Perbaikan</label>
          <Textarea value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Tulis alasan penolakan atau apa yang perlu diperbaiki..." />
          <div className="flex justify-end mt-2">
            <Button variant="destructive" onClick={handleTolak}>Kirim Penolakan</Button>
          </div>
        </div>
      )}
    </div>
  );
}