'use client';

import { useState } from 'react';
import { useApiData } from '@/hooks/useApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingState, ErrorState } from '@/components/common/States';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApiSubmit } from '@/hooks/useApi';
import { User } from '@/types';
import { UserProfile as ProfileType, ProfileData } from '@/types/profile';
import apiClient from '@/lib/api';

// Inline ProfileForm Component
// Update ProfileForm component
function ProfileForm({ user, profile, onUpdate }: {
    user?: User;
    profile?: ProfileType;
    onUpdate: () => void;
}) {
    const [formData, setFormData] = useState<Partial<ProfileType>>(profile || {});
    const { submit, isLoading, error } = useApiSubmit();
    
    // Check if user is mahasiswa
    const isMahasiswa = user?.role?.slug === 'mahasiswa';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await submit(async () => {
            await apiClient.put('/profile', formData);
            onUpdate();
        });
    };

    const handleChange = (field: keyof ProfileType, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Akademik - Hanya untuk Mahasiswa */}
            {isMahasiswa && (
                <Card>
                    <CardHeader>
                        <CardTitle>Data Akademik</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="semester">Semester Saat Ini</Label>
                            <Input
                                id="semester"
                                value={formData.semester_saat_ini || ''}
                                onChange={(e) => handleChange('semester_saat_ini', e.target.value)}
                                placeholder="Semester 5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="ipk">IPK</Label>
                            <Input
                                id="ipk"
                                type="number"
                                step="0.01"
                                min="0"
                                max="4"
                                value={formData.ipk || ''}
                                onChange={(e) => handleChange('ipk', parseFloat(e.target.value) || 0)}
                                placeholder="3.50"
                            />
                        </div>
                        <div>
                            <Label htmlFor="sks">SKS yang Telah Lulus</Label>
                            <Input
                                id="sks"
                                type="number"
                                value={formData.sks_lulus || ''}
                                onChange={(e) => handleChange('sks_lulus', parseInt(e.target.value) || 0)}
                                placeholder="120"
                            />
                        </div>
                        <div>
                            <Label htmlFor="status">Status Mahasiswa</Label>
                            <select
                                id="status"
                                value={formData.status_mahasiswa || 'aktif'}
                                onChange={(e) => handleChange('status_mahasiswa', e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="aktif">Aktif</option>
                                <option value="cuti">Cuti</option>
                                <option value="lulus">Lulus</option>
                                <option value="do">Drop Out</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Data Pribadi - Untuk Semua */}
            <Card>
                <CardHeader>
                    <CardTitle>Data Pribadi</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                        <Input
                            id="tempat_lahir"
                            value={formData.tempat_lahir || ''}
                            onChange={(e) => handleChange('tempat_lahir', e.target.value)}
                            placeholder="Jakarta"
                        />
                    </div>
                    <div>
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <select
                            id="jenis_kelamin"
                            value={formData.jenis_kelamin || ''}
                            onChange={(e) => handleChange('jenis_kelamin', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Pilih jenis kelamin</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Menyimpan...' : 'Simpan Profil'}
                </Button>
            </div>
        </form>
    );
}

// Inline DocumentUpload Component
// Inline DocumentUpload Component
function DocumentUpload({ documents, requiredDocuments, onUpdate }: {
    documents: any;
    requiredDocuments: any;
    onUpdate: () => void;
}) {
    const [uploading, setUploading] = useState<string | null>(null);
    const { submit } = useApiSubmit();

    const handleUpload = async (documentType: string, file: File) => {
        setUploading(documentType);
        
        try {
            await submit(async () => {
                const formData = new FormData();
                formData.append('document_type', documentType);
                formData.append('file', file);
                
                await apiClient.post('/profile/documents', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onUpdate();
            });
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(null);
        }
    };

    const handleDelete = async (documentType: string) => {
        await submit(async () => {
            await apiClient.delete(`/profile/documents/${documentType}`);
            onUpdate();
        });
    };

    const requiredDocs = [
        { type: 'ktm', label: 'Kartu Tanda Mahasiswa (KTM)' },
        { type: 'kk', label: 'Kartu Keluarga (KK)' },
        { type: 'bukti_bayar_spp', label: 'Bukti Bayar SPP Terakhir' }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kelengkapan Dokumen</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Upload kelengkapan dokumen yang diperlukan untuk pengajuan layanan akademik.
                    Dokumen ini akan otomatis digunakan untuk semua pengajuan Anda.
                </p>
                <div className="space-y-4">
                    {requiredDocs.map(({ type, label }) => {
                        const document = documents[type];
                        const isUploading = uploading === type;
                        
                        return (
                            <div key={type} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Label className="font-medium">{label}</Label>
                                        {document ? (
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                                ✓ Sudah Upload
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                                Belum Upload
                                            </span>
                                        )}
                                    </div>
                                    
                                    {document && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(type)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Hapus
                                        </Button>
                                    )}
                                </div>
                                
                                {document ? (
                                    <div className="bg-green-50 border border-green-200 rounded p-3">
                                        <p className="text-sm text-green-800">
                                            📄 {document.original_name}
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">
                                            Diupload: {new Date(document.uploaded_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    if (file.size > 5 * 1024 * 1024) { // 5MB
                                                        alert('Ukuran file maksimal 5MB');
                                                        return;
                                                    }
                                                    handleUpload(type, file);
                                                }
                                            }}
                                            disabled={isUploading}
                                            className="mt-2"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Format: PDF, JPG, PNG. Maksimal 5MB.
                                        </p>
                                    </div>
                                )}
                                
                                {isUploading && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                        <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                                        Mengupload...
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal');
    const { data: profileData, isLoading, error, refetch } = useApiData<ProfileData>({
        endpoint: '/profile'
    });

    if (isLoading) return <LoadingState message="Memuat data profil..." />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;

    // Check if user is mahasiswa
    const isMahasiswa = profileData?.user?.role?.slug === 'mahasiswa';

    return (
        <PageLayout 
            title="Profil Saya" 
            subtitle={isMahasiswa ? "Kelola data pribadi dan upload kelengkapan dokumen" : "Kelola data pribadi"}
        >
            <div className="space-y-6">
                {/* Tab Navigation - Conditional untuk mahasiswa */}
                {isMahasiswa ? (
                    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                        <Button
                            variant={activeTab === 'personal' ? 'default' : 'ghost'}
                            onClick={() => setActiveTab('personal')}
                            className="flex-1"
                        >
                            Data Pribadi
                        </Button>
                        <Button
                            variant={activeTab === 'documents' ? 'default' : 'ghost'}
                            onClick={() => setActiveTab('documents')}
                            className="flex-1"
                        >
                            Kelengkapan Dokumen
                            {!profileData?.has_required_documents && (
                                <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                                    Belum Lengkap
                                </span>
                            )}
                        </Button>
                    </div>
                ) : (
                    // Untuk non-mahasiswa, hanya judul
                    <div className="text-center py-2">
                        <h2 className="text-xl font-semibold text-gray-800">Data Pribadi</h2>
                        <p className="text-sm text-gray-600">Kelola informasi pribadi Anda</p>
                    </div>
                )}

                {/* Content berdasarkan role */}
                {isMahasiswa ? (
                    // Mahasiswa dengan tab system
                    <>
                        {activeTab === 'personal' && (
                            <ProfileForm 
                                user={profileData?.user} 
                                profile={profileData?.profile}
                                onUpdate={refetch}
                            />
                        )}

                        {activeTab === 'documents' && (
                            <DocumentUpload 
                                documents={profileData?.documents || {}}
                                requiredDocuments={profileData?.required_documents || {}}
                                onUpdate={refetch}
                            />
                        )}
                    </>
                ) : (
                    // Non-mahasiswa langsung form profil
                    <ProfileForm 
                        user={profileData?.user} 
                        profile={profileData?.profile}
                        onUpdate={refetch}
                    />
                )}
            </div>
        </PageLayout>
    );
}