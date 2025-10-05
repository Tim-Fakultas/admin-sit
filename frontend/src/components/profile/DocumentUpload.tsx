'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Trash2 } from 'lucide-react';
import { useApiSubmit } from '@/hooks/useApi';
import { UserDocument, DocumentType } from '@/types/profile';
import apiClient from '@/lib/api';

interface DocumentUploadProps {
    documents: Record<DocumentType, UserDocument>;
    requiredDocuments: Record<DocumentType, string>;
    onUpdate: () => void;
}

export function DocumentUpload({ documents, requiredDocuments, onUpdate }: DocumentUploadProps) {
    const [uploading, setUploading] = useState<DocumentType | null>(null);
    const { submit } = useApiSubmit();

    const handleUpload = async (documentType: DocumentType, file: File) => {
        setUploading(documentType);
        
        try {
            await submit(async () => {
                const formData = new FormData();
                formData.append('document_type', documentType);
                formData.append('file', file);
                
                await apiClient.post('/profile/documents', formData);
                onUpdate();
            });
        } finally {
            setUploading(null);
        }
    };

    const handleDelete = async (documentType: DocumentType) => {
        await submit(async () => {
            await apiClient.delete(`/profile/documents/${documentType}`);
            onUpdate();
        });
    };

    const handleDownload = (documentType: DocumentType) => {
        window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api'}/profile/documents/${documentType}/download`, '_blank');
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Kelengkapan Dokumen
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Upload kelengkapan dokumen yang diperlukan untuk pengajuan layanan akademik.
                        Dokumen ini akan otomatis digunakan untuk semua pengajuan Anda.
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(requiredDocuments).map(([type, label]) => {
                        const documentType = type as DocumentType;
                        const document = documents[documentType];
                        const isUploading = uploading === documentType;
                        
                        return (
                            <div key={type} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Label className="font-medium">{label}</Label>
                                        {document ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                                        )}
                                    </div>
                                    
                                    {document && (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownload(documentType)}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(documentType)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
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
                                                if (file) handleUpload(documentType, file);
                                            }}
                                            disabled={isUploading}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Format: PDF, JPG, PNG. Maksimal 5MB.
                                        </p>
                                    </div>
                                )}
                                
                                {isUploading && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                        <Upload className="h-4 w-4 animate-spin" />
                                        Mengupload...
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}