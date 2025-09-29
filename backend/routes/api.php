<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\JenisSuratController;
use App\Http\Controllers\Api\SuratController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Rute untuk Pengajuan Surat
Route::get('/jenis-surat', [JenisSuratController::class, 'index']);
Route::get('/jenis-surat/{jenisSurat}', [JenisSuratController::class, 'show']);
Route::post('/surat', [SuratController::class, 'store']);
Route::get('/surat', [SuratController::class, 'index']);

