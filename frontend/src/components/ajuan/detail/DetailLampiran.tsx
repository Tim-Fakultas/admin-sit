// src/components/ajuan/detail/DetailLampiran.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SuratDetail } from "@/types";

export function DetailLampiran({ data }: { data: SuratDetail }) {
  const storageUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace('/api', '/storage') || 'http://localhost:8000/storage';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data yang Wajib Diisi</CardTitle>
        <CardDescription>
          Data dan file yang diunggah oleh mahasiswa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Keterangan Pengajuan</h4>
          <p className="text-sm text-muted-foreground p-3 bg-gray-50 rounded-md">
            {data.form_data?.keterangan || 'Tidak ada keterangan.'}
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Lampiran Syarat</h4>
          <ul className="list-disc pl-5 space-y-2">
            {data.lampiran?.length > 0 ? data.lampiran.map(file => {
              const fileUrl = file.file_path.replace('public/', '');
              return (
                <li key={file.id}>
                  <span className="font-semibold">{file.file_name}: </span>
                  <a href={`${storageUrl}/${fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Lihat File
                  </a>
                </li>
              );
            }) : <li className="text-gray-500">Tidak ada lampiran.</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}