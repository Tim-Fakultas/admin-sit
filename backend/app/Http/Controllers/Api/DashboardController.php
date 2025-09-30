<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Surat;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Mengambil data statistik untuk dashboard.
     */
    public function stats(Request $request)
    {
        $user = $request->user();
        
        // Jika mahasiswa, tampilkan hanya data miliknya
        // Jika admin/pejabat, tampilkan semua data
        $query = Surat::query();
        
        if ($user->role->slug === 'mahasiswa') {
            $query->where('user_id', $user->id);
        }

        // Menghitung total pengajuan
        $totalPengajuan = $query->count();

        // Menghitung yang sudah disetujui
        $sudahAcc = (clone $query)->where('status', 'disetujui')->count();

        // Menghitung yang ditolak
        $tolakAcc = (clone $query)->where('status', 'ditolak')->count();

        // Menghitung yang butuh perbaikan
        $perbaikan = (clone $query)->where('status', 'perbaikan')->count();

        // Menghitung yang sedang diproses (pending/diajukan)
        $pending = (clone $query)->where('status', 'diajukan')->count();

        // Mengembalikan data dalam format JSON
        return response()->json([
            'total_pengajuan' => $totalPengajuan,
            'sudah_acc' => $sudahAcc,
            'tolak_acc' => $tolakAcc,
            'perbaikan' => $perbaikan,
            'pending' => $pending,
        ]);
    }
}
