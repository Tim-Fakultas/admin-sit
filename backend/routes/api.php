<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\JenisSuratController;
use App\Http\Controllers\Api\SuratController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// == Rute Publik (Tidak Perlu Login) ==
Route::post('/login', [AuthController::class, 'login']);


// == Rute Terlindungi (Wajib Login & Kirim Token) ==
Route::middleware('auth:sanctum')->group(function () {
    
    // Rute Otentikasi
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rute Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Rute Jenis Surat
    Route::get('/jenis-surat', [JenisSuratController::class, 'index']);
    Route::get('/jenis-surat/{jenisSurat}', [JenisSuratController::class, 'show']);

    // Rute Surat (CRUD & Aksi)
    Route::get('/surat', [SuratController::class, 'index']);
    Route::post('/surat', [SuratController::class, 'store']);
    Route::get('/surat/{id}', [SuratController::class, 'show']);
    Route::put('/surat/{id}/paraf', [SuratController::class, 'paraf']);
    Route::put('/surat/{id}/tolok', [SuratController::class, 'tolak']); 
    
});