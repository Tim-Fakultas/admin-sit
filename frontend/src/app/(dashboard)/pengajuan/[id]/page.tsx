'use client';

import { useParams } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { PageLayout } from "@/components/layout/PageLayout";
import { LoadingState, ErrorState } from "@/components/common/States";
import { SubmissionForm } from "@/components/pengajuan/SubmissionForm";
import { JenisSurat } from "@/types";

export default function DetailPengajuanPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: jenisSurat, isLoading, error, refetch } = useApiData<JenisSurat>({
        endpoint: `/jenis-surat/${id}`
    });

    if (isLoading) return <LoadingState message="Loading formulir..." />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (!jenisSurat) return <ErrorState message="Layanan tidak ditemukan." />;

    return (
        <PageLayout
            title={`Formulir ${jenisSurat.name}`}
            subtitle={jenisSurat.description}
            showBackButton
        >
            <SubmissionForm jenisSurat={jenisSurat} />
        </PageLayout>
    );
}