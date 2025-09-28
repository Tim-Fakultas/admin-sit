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
        // Menghitung total pengajuan
        $totalPengajuan = Surat::count();

        // Menghitung yang sudah disetujui
        $sudahAcc = Surat::where('status', 'disetujui')->count();

        // Menghitung yang ditolak
        $tolakAcc = Surat::where('status', 'ditolak')->count();

        // Menghitung yang butuh perbaikan
        $perbaikan = Surat::where('status', 'perbaikan')->count();

        // Mengembalikan data dalam format JSON
        return response()->json([
            'total_pengajuan' => $totalPengajuan,
            'sudah_acc' => $sudahAcc,
            'tolak_acc' => $tolakAcc,
            'perbaikan' => $perbaikan,
        ]);
    }
}
