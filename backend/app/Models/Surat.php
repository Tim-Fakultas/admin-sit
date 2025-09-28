<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Surat extends Model
{
    use HasFactory;

    protected $table = 'surats';

    /**
     * Get the user that owns the Surat
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the jenisSurat that owns the Surat
     */
    public function jenisSurat(): BelongsTo
    {
        return $this->belongsTo(JenisSurat::class);
    }

    /**
     * Get the role that is responsible for the Surat
     */
    public function penanggungJawab()
    {
        return $this->belongsTo(Role::class, 'penanggung_jawab_role_id');
    }

    /**
     * Get all of the lampiran for the Surat
     */
    public function lampiran()
    {
        return $this->hasMany(Lampiran::class);
    }

    /**
     * Get all of the logPersetujuan for the Surat
     */
    public function logPersetujuan()
    {
        return $this->hasMany(LogPersetujuan::class);
    }
}
