// src/components/ajuan/detail/DetailMahasiswa.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types";

export function DetailMahasiswa({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pribadi</CardTitle>
        <CardDescription>
          Data mahasiswa yang mengajukan surat.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div><Label>NIM / NIP</Label><Input value={user.nim_nip} disabled /></div>
        <div><Label>Nama</Label><Input value={user.name} disabled /></div>
        <div><Label>Prodi</Label><Input value={user.prodi?.nama || 'N/A'} disabled /></div>
        <div><Label>No. Telp / HP</Label><Input value={user.no_telpon} disabled /></div>
        <div><Label>Alamat</Label><Textarea value={user.alamat} disabled /></div>
      </CardContent>
    </Card>
  );
}