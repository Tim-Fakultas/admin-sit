'use client';

import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiSubmit } from "@/hooks/useApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";
import type { JenisSurat, FileRequirement } from "@/types";

export function SubmissionForm({ jenisSurat }: { jenisSurat: JenisSurat }) {
    const { user } = useAuthContext();
    const router = useRouter();
    const [keterangan, setKeterangan] = useState("");
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    
    const { submit, isLoading, error } = useApiSubmit();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [e.target.name]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        try {
            await submit(async () => {
                const formData = new FormData();
                formData.append('jenis_surat_id', String(jenisSurat.id));
                formData.append('keterangan', keterangan);

                // Pastikan nama field file sesuai validasi backend
                if (jenisSurat.required_fields?.files) {
                    jenisSurat.required_fields.files.forEach((field: FileRequirement) => {
                        if (files[field.name]) {
                            formData.append(`files[${field.name}]`, files[field.name]!);
                        }
                    });
                }

                const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
                return await apiClient.post('/surat', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            });

            // Success - redirect to daftar ajuan
            router.replace('/daftar-ajuan');
        } catch (err: any) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
                    {error}
                </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* ========================================================== */}
                {/* LENGKAPI BAGIAN KARTU INI */}
                {/* ========================================================== */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pribadi</CardTitle>
                        <CardDescription>
                            Jika terdapat data yang salah silakan menghubungi admin fakultas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>NIM / NIP</Label>
                            <Input value={user?.nim_nip || ''} disabled />
                        </div>
                        <div>
                            <Label>Nama</Label>
                            <Input value={user?.name || ''} disabled />
                        </div>
                        <div>
                            <Label>Tempat, Tanggal Lahir</Label>
                            <Input value={user?.ttl || ''} disabled />
                        </div>
                        <div>
                            <Label>No. Telp / HP</Label>
                            <Input value={user?.no_telpon || ''} disabled />
                        </div>
                        <div>
                            <Label>Alamat</Label>
                            {/* Gunakan Textarea jika alamat bisa panjang */}
                            <Textarea value={user?.alamat || ''} disabled />
                        </div>
                        <div>
                            <Label>Prodi</Label>
                            {/* Kita akan perbaiki ini di bawah agar nama prodi muncul */}
                            <Input value={user?.prodi?.nama || 'Tidak ada data'} disabled />
                        </div>
                    </CardContent>
                </Card>

                {/* Kartu Data Wajib Diisi (tidak berubah) */}
                <Card>
                    <CardHeader><CardTitle>Data yang Wajib Diisi</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="keterangan">Keterangan</Label>
                            <Textarea 
                                id="keterangan" 
                                value={keterangan} 
                                onChange={(e) => setKeterangan(e.target.value)} 
                                placeholder="Tuliskan tujuan pengajuan Anda..." 
                            />
                            {errors?.keterangan && (
                                <p className="text-sm text-red-500 mt-1">{errors.keterangan[0]}</p>
                            )}
                        </div>
                        {jenisSurat.required_fields?.files?.map((field: FileRequirement) => (
                            <div key={field.name}>
                                <Label htmlFor={field.name}>{field.label}</Label>
                                <Input 
                                    id={field.name} 
                                    name={field.name} 
                                    type="file" 
                                    required 
                                    onChange={handleFileChange} 
                                />
                                {errors?.[`files.${field.name}`] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[`files.${field.name}`][0]}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">Tipe file: PDF, JPG, PNG. Maks: 3MB.</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Mengirim...' : 'Kirim Pengajuan'}
                </Button>
            </div>
        </form>
    );
}