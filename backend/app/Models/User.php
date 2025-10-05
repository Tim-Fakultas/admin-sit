<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the prodi that owns the User
     */
    public function prodi()
    {
        return $this->belongsTo(Prodi::class);
    }

    /**
     * Get all of the surat for the User
     */
    public function surat()
    {
        return $this->hasMany(Surat::class);
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function documents()
    {
        return $this->hasMany(UserDocument::class);
    }

    // Helper method untuk cek kelengkapan dokumen
    public function hasRequiredDocuments()
    {
        $requiredDocs = ['ktm', 'kk', 'bukti_bayar_spp'];
        $userDocs = $this->documents()->whereIn('document_type', $requiredDocs)->pluck('document_type')->toArray();
        return count(array_intersect($requiredDocs, $userDocs)) === count($requiredDocs);
    }

}
