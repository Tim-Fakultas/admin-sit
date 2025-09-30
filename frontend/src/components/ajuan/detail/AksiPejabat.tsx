// src/components/ajuan/detail/AksiPejabat.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";

export function AksiPejabat({ suratId, userRole }: { suratId: number; userRole?: string }) {
  const router = useRouter();
  const [catatan, setCatatan] = useState("");
  const [showCatatan, setShowCatatan] = useState(false);

  const handleParaf = async () => {
    try {
      await apiClient.put(`/surat/${suratId}/paraf`);
      alert('Surat berhasil diparaf.');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memparaf surat.');
    }
  };
  const handleTolak = async () => {
    try {
      await apiClient.put(`/surat/${suratId}/tolak`, { catatan });
      alert('Surat berhasil ditolak.');
      setShowCatatan(false);
      setCatatan('');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menolak surat.');
    }
  };

  const canReject = userRole === 'bagian_umum' || userRole === 'kabag_tu' || userRole === 'wakil_dekan';

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <Button onClick={handleParaf}>Paraf & Lanjutkan</Button>
        {canReject && (
          <Button variant="destructive" onClick={() => setShowCatatan(!showCatatan)}>
            Tolak / Minta Perbaikan
          </Button>
        )}
        <Button variant="outline" onClick={() => router.back()}>Kembali</Button>
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