<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisSurat;
use App\Models\Surat;
use App\Models\WorkflowStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    
        $surats = Surat::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($surats);
    }
}
