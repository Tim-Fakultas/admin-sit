<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisSurat;
use Illuminate\Http\Request;

class JenisSuratController extends Controller
{
    /**
     * Menampilkan semua jenis surat.
     */
    public function index()
    {
        $jenisSurat = JenisSurat::all();
        return response()->json($jenisSurat);
    }

    /**
     * Menampilkan detail satu jenis surat.
     */
    public function show(JenisSurat $jenisSurat)
    {
    // Decode required_fields dari string JSON ke array/object
    $jenisSurat->required_fields = $jenisSurat->required_fields ? json_decode($jenisSurat->required_fields, true) : null;
    return response()->json($jenisSurat);
    }
}
