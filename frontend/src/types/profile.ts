// frontend/src/types/profile.ts
import { User } from './index';

export interface UserProfile {
    id?: number;
    user_id: number;
    tempat_lahir?: string;
    jenis_kelamin?: 'L' | 'P';
    agama?: string;
    semester_saat_ini?: string;
    ipk?: number;
    sks_lulus?: number;
    status_mahasiswa?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserDocument {
    id: number;
    user_id: number;
    document_type: DocumentType;
    original_name: string;
    file_path: string;
    file_size: string;
    mime_type: string;
    is_verified: boolean;
    uploaded_at: string;
    file_url?: string;
}

export type DocumentType = 'ktm' | 'kk' | 'bukti_bayar_spp' | 'foto_diri';

export interface ProfileData {
    user: User;
    profile?: UserProfile;
    documents: Record<DocumentType, UserDocument>;
    required_documents: Record<DocumentType, string>;
    has_required_documents: boolean;
}