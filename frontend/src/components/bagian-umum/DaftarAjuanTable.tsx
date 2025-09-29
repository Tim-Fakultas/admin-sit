import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Tipe data pengajuan
export type Pengajuan = {
  id: number;
  user?: { name: string; nim_nip: string };
  status: string;
  created_at: string;
};

export default function DaftarAjuanTable({ status }: { status: string }) {
  const [data, setData] = useState<Pengajuan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch data dari API, filter by status
    // Ganti endpoint sesuai kebutuhan, misal /surat?status=xxx
    import('@/lib/api').then(({ default: apiClient }) => {
      apiClient.get(`/surat?status=${status}`)
        .then(res => setData(res.data))
        .catch(() => setError("Gagal memuat data pengajuan."))
        .finally(() => setIsLoading(false));
    });
  }, [status]);

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <CardContent>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-2">No</th>
            <th className="px-2 py-2">Nama</th>
            <th className="px-2 py-2">NIM</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-2 py-2">Tanggal Pengajuan</th>
            <th className="px-2 py-2">Aksi</th>
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
              <td className="px-2 py-2 space-x-2">
                <Button size="sm" variant="outline" onClick={() => router.push(`/bagian-umum/ajuan-layanan/${ajuan.id}`)}>Detail</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent>
  );
}
