// src/components/ajuan/detail/AksiPejabat.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";

export function AksiPejabat({ suratId }: { suratId: number }) {
  const router = useRouter();
  const [catatan, setCatatan] = useState("");
  const [showCatatan, setShowCatatan] = useState(false);

  const handleParaf = async () => {
    // ... (fungsi handleParaf) ...
  };
  const handleTolak = async () => {
    // ... (fungsi handleTolak) ...
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <Button onClick={handleParaf}>Paraf & Lanjutkan</Button>
        <Button variant="destructive" onClick={() => setShowCatatan(!showCatatan)}>
          Tolak / Minta Perbaikan
        </Button>
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