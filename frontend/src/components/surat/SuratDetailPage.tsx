import { useApiData } from '@/hooks/useApi';
import { useAuthContext } from '@/contexts/AuthContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingState, ErrorState } from '@/components/common/States';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DetailMahasiswa } from '@/components/ajuan/detail/DetailMahasiswa';
import { DetailLampiran } from '@/components/ajuan/detail/DetailLampiran';
import { AksiPejabat } from '@/components/ajuan/detail/AksiPejabat';
import { PDFViewer } from '@/components/ajuan/detail/PDFViewer';
import { SuratDetail } from '@/types';

interface SuratDetailPageProps {
  id: string;
  pageTitle?: string;
}

export function SuratDetailPage({ id, pageTitle }: SuratDetailPageProps) {
  const { user } = useAuthContext();
  const { data, isLoading, error, refetch } = useApiData<SuratDetail>({
    endpoint: `/surat/${id}`
  });

  if (isLoading) return <LoadingState message="Loading detail..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data) return <ErrorState message="Data pengajuan tidak ditemukan." />;

  // Logika tampilan berdasarkan user context dari backend
  const userContext = data.user_context || {
    role: user?.role?.slug || '',
    can_paraf: false,
    can_tolak: false,
    show_pdf_only: false,
    show_form_data: true
  };

  const title = userContext.show_pdf_only 
    ? `${pageTitle || 'Surat Keterangan'}`
    : `Detail Pengajuan`;

  return (
    <PageLayout 
      title={`${title}: ${data.jenis_surat.name}`}
      showBackButton
    >
      {/* Status badge */}
      <div className="mb-6">
        <StatusBadge status={data.status} />
      </div>

      {/* Tampilan PDF untuk mahasiswa yang sudah disetujui atau pejabat */}
      {userContext.show_pdf_only && data.file_path ? (
        <div className="space-y-6">
          <PDFViewer 
            filePath={data.file_path} 
            suratId={data.id}
            title={`${pageTitle || 'Surat'} ${data.jenis_surat.name}`}
          />
          
          {/* Show aksi for officers */}
          {(userContext.can_paraf || userContext.can_tolak) && (
            <AksiPejabat suratId={data.id} userContext={userContext} />
          )}
        </div>
      ) : (
        /* Tampilan form data untuk bagian umum dan mahasiswa yang belum selesai */
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <DetailMahasiswa user={data.user} />
            <DetailLampiran data={data} showFormData={userContext.show_form_data} />
          </div>

          {/* Show aksi for officers */}
          {(userContext.can_paraf || userContext.can_tolak) && (
            <AksiPejabat suratId={data.id} userContext={userContext} />
          )}
        </div>
      )}
    </PageLayout>
  );
}