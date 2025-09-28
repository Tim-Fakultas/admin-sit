<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Menangani permintaan login.
     */
    public function login(Request $request)
    {
        // Validasi input: nim_nip dan password wajib diisi
        $credentials = $request->validate([
            'nim_nip' => 'required|string',
            'password' => 'required'
        ]);

        // Mencoba otentikasi
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $user->tokens()->delete(); // Hapus token lama
            $token = $user->createToken('auth_token')->plainTextToken; // Buat token baru

            // Kirim response sukses
            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'user' => $user
            ]);
        }

        // Kirim response gagal
        return response()->json(['message' => 'NIM/NIP atau password salah'], 401);
    }

    public function logout(Request $request)
    {
        // Menghapus token otentikasi yang sedang digunakan
        $request->user()->currentAccessToken()->delete();

        // Mengirim response sukses
        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    // Fungsi untuk register dan logout akan kita tambahkan nanti
}
