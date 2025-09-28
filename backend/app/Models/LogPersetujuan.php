<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogPersetujuan extends Model
{
    use HasFactory;

    protected $table = 'log_persetujuans';

    /**
     * Get the surat that owns the LogPersetujuan
     */
    public function surat()
    {
        return $this->belongsTo(Surat::class);
    }

    /**
     * Get the user that owns the LogPersetujuan
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the role that owns the LogPersetujuan
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
