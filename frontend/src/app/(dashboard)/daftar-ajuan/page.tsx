"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api";

type Pengajuan = {
  id: number;
  user?: { name: string; nim_nip: string };
  status: string;
  created_at: string;
};

export default function DaftarAjuanPage() {
  const [data, setData] = useState<Pengajuan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient.get("/surat")
      .then(res => setData(res.data))
      .catch(() => setError("Gagal memuat data pengajuan."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengajuan Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">No</th>
                <th className="px-2 py-2">Nama</th>
                <th className="px-2 py-2">NIM</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Tanggal Pengajuan</th>
                <th className="px-2 py-2">Tools</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ajuan, idx) => (
                <tr key={ajuan.id} className="border-b">
                  <td className="px-2 py-2">{idx + 1}</td>
                  <td className="px-2 py-2">{ajuan.user?.name}</td>
                  <td className="px-2 py-2">{ajuan.user?.nim_nip}</td>
                  <td className="px-2 py-2">{ajuan.status}</td>
                  <td className="px-2 py-2">{ajuan.created_at}</td>
                  <td className="px-2 py-2">
                    <Button size="sm" variant="outline">Detail</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
