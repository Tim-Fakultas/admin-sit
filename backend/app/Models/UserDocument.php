<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'document_type',
        'original_name',
        'file_path',
        'file_size',
        'mime_type',
        'is_verified',
        'uploaded_at'
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'is_verified' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFileUrlAttribute()
    {
        return asset('storage/' . $this->file_path);
    }

    public static function getRequiredDocuments()
    {
        return [
            'ktm' => 'Kartu Tanda Mahasiswa (KTM)',
            'kk' => 'Kartu Keluarga (KK)',
            'bukti_bayar_spp' => 'Bukti Bayar SPP Terakhir',
            'foto_diri' => 'Foto Diri 4x6'
        ];
    }
}