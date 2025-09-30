'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface PDFViewerProps {
  filePath: string;
  suratId: number;
  title?: string;
}

export function PDFViewer({ filePath, suratId, title = "Surat Keterangan" }: PDFViewerProps) {
  const storageUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace('/api', '/storage') || 'http://localhost:8000/storage';
  
  // Pastikan path sudah dalam format yang benar (tanpa 'public/' prefix)
  const cleanPath = filePath.startsWith('public/') ? filePath.replace('public/', '') : filePath;
  const pdfUrl = `${storageUrl}/${cleanPath}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `surat_${suratId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleOpenInNewTab}>
              Buka di Tab Baru
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Unduh PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[800px] border rounded-lg overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title="PDF Viewer"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Jika PDF tidak tampil, silakan <button onClick={handleOpenInNewTab} className="text-blue-600 underline">buka di tab baru</button> atau unduh file.
        </p>
      </CardContent>
    </Card>
  );
}