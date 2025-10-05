<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tempat_lahir',
        'jenis_kelamin',
        'agama',
        'semester_saat_ini',
        'ipk',
        'sks_lulus',
        'status_mahasiswa'
    ];

    protected $casts = [
        'ipk' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}