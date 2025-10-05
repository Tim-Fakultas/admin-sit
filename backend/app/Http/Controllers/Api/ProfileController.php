<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        try {
            $userId = Auth::id();
            
            if (!$userId) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Load user dengan relasi
            $user = User::with(['prodi', 'role'])->find($userId);
            
            // Load profile jika ada
            $profile = UserProfile::where('user_id', $userId)->first();
            
            // Load documents jika ada
            $documents = UserDocument::where('user_id', $userId)->get()->keyBy('document_type');
            
            // Tentukan required documents berdasarkan role
            $requiredDocuments = [];
            $isMahasiswa = $user->role->slug === 'mahasiswa';
            
            if ($isMahasiswa) {
                // Mahasiswa butuh dokumen kelengkapan
                $requiredDocuments = [
                    'ktm' => 'Kartu Tanda Mahasiswa (KTM)',
                    'kk' => 'Kartu Keluarga (KK)',
                    'bukti_bayar_spp' => 'Bukti Bayar SPP Terakhir',
                    'foto_diri' => 'Foto Diri 4x6'
                ];
            } else {
                // Pejabat hanya butuh foto diri
                $requiredDocuments = [
                    'foto_diri' => 'Foto Diri 4x6'
                ];
            }
            
            return response()->json([
                'user' => $user,
                'profile' => $profile,
                'documents' => $documents,
                'required_documents' => $requiredDocuments,
                'is_mahasiswa' => $isMahasiswa,
                'has_required_documents' => $documents->whereIn('document_type', array_keys($requiredDocuments))->count() >= count($requiredDocuments)
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $userId = Auth::id();
            $user = Auth::user();
            
            // Validasi berbeda untuk mahasiswa vs pejabat
            $isMahasiswa = $user->role->slug === 'mahasiswa';
            
            if ($isMahasiswa) {
                // Validasi lengkap untuk mahasiswa
                $validated = $request->validate([
                    'tempat_lahir' => 'nullable|string|max:100',
                    'jenis_kelamin' => 'nullable|in:L,P',
                    'agama' => 'nullable|string|max:50',
                    'semester_saat_ini' => 'nullable|string|max:10',
                    'ipk' => 'nullable|numeric|between:0,4.00',
                    'sks_lulus' => 'nullable|integer|min:0',
                    'status_mahasiswa' => 'nullable|string|max:20'
                ]);
            } else {
                // Validasi sederhana untuk pejabat
                $validated = $request->validate([
                    'tempat_lahir' => 'nullable|string|max:100',
                    'jenis_kelamin' => 'nullable|in:L,P',
                    'agama' => 'nullable|string|max:50'
                ]);
            }

            $profile = UserProfile::updateOrCreate(
                ['user_id' => $userId],
                $validated
            );

            return response()->json([
                'message' => 'Profil berhasil diperbarui',
                'profile' => $profile
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function uploadDocument(Request $request)
    {
        try {
            $userId = Auth::id();
            $user = Auth::user();
            $isMahasiswa = $user->role->slug === 'mahasiswa';
            
            // Tentukan document types yang diizinkan berdasarkan role
            $allowedTypes = $isMahasiswa 
                ? ['ktm', 'kk', 'bukti_bayar_spp', 'foto_diri']
                : ['foto_diri'];
            
            $validated = $request->validate([
                'document_type' => 'required|in:' . implode(',', $allowedTypes),
                'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120' // 5MB
            ]);

            $userId = Auth::id();
            $file = $request->file('file');
            
            // Generate nama file yang unik
            $fileName = $user->nim_nip . '_' . $validated['document_type'] . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            // Simpan file
            $filePath = $file->storeAs('documents/' . $user->nim_nip, $fileName, 'public');
            
            // Hapus dokumen lama jika ada
            $oldDocument = UserDocument::where('user_id', $userId)
                ->where('document_type', $validated['document_type'])
                ->first();
                
            if ($oldDocument) {
                Storage::disk('public')->delete($oldDocument->file_path);
                $oldDocument->delete();
            }
            
            // Simpan record dokumen baru
            $document = UserDocument::create([
                'user_id' => $userId,
                'document_type' => $validated['document_type'],
                'original_name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'uploaded_at' => now()
            ]);

            return response()->json([
                'message' => 'Dokumen berhasil diupload',
                'document' => $document
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteDocument($documentType)
    {
        try {
            $userId = Auth::id();
            
            $document = UserDocument::where('user_id', $userId)
                ->where('document_type', $documentType)
                ->first();
                
            if (!$document) {
                return response()->json(['message' => 'Dokumen tidak ditemukan'], 404);
            }
            
            // Hapus file fisik
            Storage::disk('public')->delete($document->file_path);
            
            // Hapus record
            $document->delete();
            
            return response()->json(['message' => 'Dokumen berhasil dihapus']);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function downloadDocument($documentType)
    {
        try {
            $userId = Auth::id();
            
            $document = UserDocument::where('user_id', $userId)
                ->where('document_type', $documentType)
                ->first();
                
            if (!$document) {
                return response()->json(['message' => 'Dokumen tidak ditemukan'], 404);
            }
            
            $filePath = storage_path('app/public/' . $document->file_path);
            
            if (!file_exists($filePath)) {
                return response()->json(['message' => 'File tidak ditemukan'], 404);
            }
            
            return response()->download($filePath, $document->original_name);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
}