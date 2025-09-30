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
    // tambahkan properti lain sesuai kebutuhan
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
}

export interface SuratDetail {
  id: number;
  status: string;
  form_data: {
    keterangan: string;
  };
  user: User; // User yang mengajukan
  jenis_surat: JenisSurat;
  lampiran: Lampiran[];
  file_path?: string;
}
