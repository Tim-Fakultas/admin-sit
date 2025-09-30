/**
 * Utility functions for status handling
 */

export type StatusVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive';

export const getStatusVariant = (status: string): StatusVariant => {
  switch (status?.toLowerCase()) {
    case 'disetujui':
    case 'approved':
    case 'selesai':
    case 'completed':
      return 'success';
    
    case 'ditolak':
    case 'rejected':
    case 'gagal':
      return 'destructive';
    
    case 'pending':
    case 'menunggu':
    case 'dalam proses':
    case 'diproses':
      return 'warning';
    
    case 'draft':
    case 'konsep':
      return 'secondary';
    
    default:
      return 'default';
  }
};

export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'Menunggu',
    'approved': 'Disetujui',
    'rejected': 'Ditolak',
    'in_progress': 'Dalam Proses',
    'completed': 'Selesai',
    'draft': 'Draft',
    'submitted': 'Terkirim'
  };
  
  return statusMap[status?.toLowerCase()] || status;
};