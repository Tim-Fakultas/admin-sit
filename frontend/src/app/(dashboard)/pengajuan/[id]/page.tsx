'use client'; // <-- INI ADALAH KUNCI UNTUK MEMPERBAIKI MASALAH LOADING

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/api";
import { SubmissionForm } from "@/components/pengajuan/SubmissionForm";
import { JenisSurat } from "@/types";

export default function DetailPengajuanPage() {
    const params = useParams();
    const { id } = params;
    const [jenisSurat, setJenisSurat] = useState<JenisSurat | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof id === 'string') {
            setIsLoading(true);
            setError('');
            apiClient.get(`/jenis-surat/${id}`)
                .then(response => {
                    setJenisSurat(response.data);
                })
                .catch(error => {
                    console.error("Gagal mengambil detail layanan:", error);
                    setError('Gagal memuat detail layanan. Silakan coba lagi.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <div className="text-center p-10">Loading formulir...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    if (!jenisSurat) {
        return <div className="text-center p-10">Layanan tidak ditemukan.</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2">Formulir {jenisSurat.name}</h1>
            <p className="text-muted-foreground mb-6">{jenisSurat.description}</p>
            <SubmissionForm jenisSurat={jenisSurat} />
        </div>
    );
}