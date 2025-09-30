<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisSurat;
use App\Models\Surat;
use App\Models\WorkflowStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class SuratController extends Controller
{
    public function store(Request $request)
    {
        // Validasi disesuaikan dengan syarat dari "Surat Keterangan Aktif Kuliah"
        $request->validate([
            'jenis_surat_id' => 'required|exists:jenissurats,id',
            'keterangan' => 'nullable|string',
            'files.file_ktm' => 'required|file|mimes:pdf,jpg,jpeg,png|max:3072',
            'files.file_kk' => 'required|file|mimes:pdf,jpg,jpeg,png|max:3072',
            'files.file_spp' => 'required|file|mimes:pdf,jpg,jpeg,png|max:3072',
        ]);

        $jenisSurat = JenisSurat::find($request->jenis_surat_id);

        $firstStep = WorkflowStep::where('workflow_id', $jenisSurat->workflow_id)
            ->where('step', 1)->first();

        if (!$firstStep) {
            return response()->json(['message' => 'Alur kerja untuk surat ini tidak valid.'], 400);
        }

        $surat = new Surat();
        $surat->user_id = Auth::id();
        $surat->jenis_surat_id = $jenisSurat->id;
        $surat->status = 'diajukan';
        $surat->penanggung_jawab_role_id = $firstStep->role_id;
        $surat->form_data = json_encode(['keterangan' => $request->keterangan]);
        $surat->save();

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $key => $file) {
                $path = $file->store('public/lampiran');
                $surat->lampiran()->create([
                    'file_name' => $key,
                    'file_path' => $path,
                ]);
            }
        }

        return response()->json(['message' => 'Pengajuan berhasil dikirim.', 'surat' => $surat], 201);
    }

    
    public function index()
    {
        $user = Auth::user();
        
        if ($user->role->slug === 'mahasiswa') {
            // Mahasiswa hanya melihat surat miliknya sendiri
            $surats = Surat::with(['user', 'jenisSurat'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            // Pejabat hanya melihat surat yang menjadi tanggung jawabnya
            // DAN belum selesai (status bukan 'disetujui')
            $surats = Surat::with(['user', 'jenisSurat'])
                ->where('penanggung_jawab_role_id', $user->role_id)
                ->where('status', '!=', 'disetujui') // Surat yang sudah selesai tidak muncul lagi
                ->orderBy('created_at', 'desc')
                ->get();
        }
        
        return response()->json($surats);
    }

    public function show($id)
    {
        $user = Auth::user();
        $surat = Surat::with(['user.prodi', 'jenisSurat', 'lampiran'])->findOrFail($id);
        
        // Tambahkan context untuk frontend
        $response = $surat->toArray();
        $response['user_context'] = [
            'role' => $user->role->slug,
            'can_paraf' => false,
            'can_tolak' => false,
            'show_pdf_only' => false,
            'show_form_data' => true
        ];
        
        // Logika berdasarkan role dan status
        if ($user->role->slug === 'mahasiswa') {
            // Mahasiswa: jika sudah disetujui, tampilkan PDF saja
            if ($surat->status === 'disetujui' && $surat->file_path) {
                $response['user_context']['show_pdf_only'] = true;
                $response['user_context']['show_form_data'] = false;
            }
        } else {
            // Pejabat: cek apakah dia yang bertanggung jawab
            if ($surat->penanggung_jawab_role_id === $user->role_id && $surat->status === 'diajukan') {
                $response['user_context']['can_paraf'] = true;
                
                // Hanya bagian umum, kabag tu, wakil dekan, dan dekan yang bisa tolak
                if (in_array($user->role->slug, ['bagian-umum', 'kabag-tu', 'wakil-dekan-1', 'dekan'])) {
                    $response['user_context']['can_tolak'] = true;
                }
            }
            
            // Jika bukan bagian umum DAN sudah ada PDF, tampilkan PDF preview
            if ($user->role->slug !== 'bagian-umum' && $surat->file_path) {
                $response['user_context']['show_pdf_only'] = true;
                $response['user_context']['show_form_data'] = false;
            }
        }
        
        return response()->json($response);
    }

    public function paraf($id)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized.'], 401);
            }

            $surat = Surat::with(['user.prodi', 'jenisSurat'])->findOrFail($id);
            
            // Periksa apakah user berhak memparaf surat ini
            if ($surat->penanggung_jawab_role_id !== $user->role_id) {
                return response()->json(['message' => 'Anda tidak berhak memparaf surat ini.'], 403);
            }

            // Lanjut ke workflow berikutnya
            $currentStep = WorkflowStep::where('workflow_id', $surat->jenisSurat->workflow_id)
                ->where('role_id', $surat->penanggung_jawab_role_id)
                ->first();
                
            if (!$currentStep) {
                return response()->json(['message' => 'Workflow step tidak ditemukan.'], 400);
            }

            $nextStep = WorkflowStep::where('workflow_id', $surat->jenisSurat->workflow_id)
                ->where('step', '>', $currentStep->step)
                ->orderBy('step')
                ->first();
                
            if ($nextStep) {
                $surat->penanggung_jawab_role_id = $nextStep->role_id;
                $surat->status = 'diajukan';
            } else {
                $surat->status = 'disetujui';
                // Generate nomor surat final ketika workflow selesai
                if (!$surat->nomor_surat) {
                    $surat->nomor_surat = 'B-' . $surat->id . '/Un.09/PP.07/VIII.2/09/' . date('Y');
                }
            }
            
            // Generate PDF setelah step bagian umum (step 1) ATAU workflow selesai
            if ($currentStep->step === 1 || !$nextStep) {
                // Pastikan direktori surat ada di private/public (sesuai symlink)
                $suratDir = storage_path('app/private/public/surat');
                if (!file_exists($suratDir)) {
                    mkdir($suratDir, 0755, true);
                }
                
                // Generate PDF
                $pdf = Pdf::loadView('surat', compact('surat'));
                $fileName = 'surat_' . $surat->id . '.pdf';
                $path = 'surat/' . $fileName; // Path relatif untuk URL
                $fullPath = $suratDir . '/' . $fileName; // Path absolut untuk save
                
                $pdf->save($fullPath);
                $surat->file_path = $path; // Simpan path relatif
            }
            
            $surat->save();
            return response()->json(['message' => 'Surat diparaf dan lanjut workflow.', 'surat' => $surat]);
            
        } catch (\Exception $e) {
            Log::error('Error in paraf method: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['message' => 'Terjadi kesalahan saat memparaf surat: ' . $e->getMessage()], 500);
        }
    }

    public function tolak($id, Request $request)
    {
        $request->validate([
            'catatan' => 'required|string',
        ]);
        $user = Auth::user();
        if (!in_array($user->role->slug, ['bagian-umum', 'kabag-tu', 'wakil-dekan-1', 'dekan'])) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk menolak surat.'], 403);
        }
        $surat = Surat::findOrFail($id);
        $surat->status = 'ditolak';
        $surat->catatan_revisi = $request->catatan;
        $surat->save();
        return response()->json(['message' => 'Surat ditolak.', 'surat' => $surat]);
    }
}
