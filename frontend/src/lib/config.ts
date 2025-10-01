// Environment Configuration
export const config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  APP_NAME: 'SIMAK - Sistem Akademik',
  APP_VERSION: '2.0.0',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    PROFILE: '/profile',
    REFRESH: '/refresh-token',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
  },
  PENGAJUAN: {
    LIST: '/pengajuan',
    CREATE: '/pengajuan',
    DETAIL: (id: string) => `/pengajuan/${id}`,
    UPDATE: (id: string) => `/pengajuan/${id}`,
    DELETE: (id: string) => `/pengajuan/${id}`,
  },
  SURAT: {
    JENIS: '/jenis-surat',
    TEMPLATES: '/surat-templates',
  },
} as const;

// App Constants
export const ROLES = {
  MAHASISWA: 'mahasiswa',
  DOSEN: 'dosen',
  BAGIAN_UMUM: 'bagian-umum',
  ADMIN: 'admin',
} as const;

export const STATUS_PENGAJUAN = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REVISION: 'revision',
} as const;
