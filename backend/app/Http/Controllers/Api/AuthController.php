<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'nim_nip' => 'required|string',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $user->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;

            $user->load('prodi', 'role');

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'user' => $user
            ]);
        }
        return response()->json(['message' => 'NIM/NIP atau password salah'], 401);
    }

    /**
     * Menangani permintaan logout dengan metode yang lebih aman.
     */
    public function logout()
    {
        // Ambil user yang sedang login secara eksplisit melalui guard 'sanctum'
        $user = Auth::guard('sanctum')->user();

        // Penjaga: Pastikan user benar-benar ada sebelum melakukan apapun
        if ($user) {
            // Hapus token yang sedang digunakan untuk request ini
            $user->currentAccessToken()->delete();

            return response()->json(['message' => 'Logout successful']);
        }

        // Jika karena alasan aneh user tidak ditemukan, kirim response error yang benar
        return response()->json(['message' => 'Unauthenticated.'], 401);
    }
}
