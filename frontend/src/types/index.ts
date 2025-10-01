// src/types/index.ts

export interface Prodi {
    id: number;
    nama: string;
}

export interface Role {
    id: number;
    name: string;
    slug: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    nim_nip: string;
    ttl: string;
    no_telpon: string;
    alamat: string;
    role_id: number;
    prodi_id: number | null;
    // Relasi yang dimuat dari backend
    role: Role;
    prodi: Prodi | null;
}

export interface FileRequirement {
    name: string;
    label: string;
    required?: boolean;
    accept?: string;
    maxSize?: number;
}

export interface JenisSurat {
    id: number;
    name: string;
    description: string;
    required_fields?: {
        files?: FileRequirement[];
        // properti lain sesuai kebutuhan
    };
    // properti lain sesuai kebutuhan
}

export interface Lampiran {
  id: number;
  file_name: string;
  file_path: string;
  mime_type?: string;
  size?: number;
  uploaded_at?: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

// Form Types
export interface LoginFormData {
    nim_nip: string;
    password: string;
    remember_me?: boolean;
}

// Status Types
export type StatusPengajuan = 'pending' | 'approved' | 'rejected' | 'revision';
export type RoleSlug = 'mahasiswa' | 'dosen' | 'bagian-umum' | 'admin';

// Pengajuan Types
export interface Pengajuan {
    id: number;
    user_id: number;
    jenis_surat_id: number;
    status: StatusPengajuan;
    data_pengajuan: Record<string, any>;
    created_at: string;
    updated_at: string;
    user: User;
    jenis_surat: JenisSurat;
    lampiran?: Lampiran[];
}

// Dashboard Stats
export interface DashboardStats {
    total_pengajuan: number;
    sudah_acc: number;
    tolak_acc: number;
    perbaikan: number;
    pending: number;
}
