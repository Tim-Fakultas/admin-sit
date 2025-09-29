<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lampiran extends Model
{
    use HasFactory;

    protected $table = 'lampirans';

    protected $fillable = ['file_name', 'file_path', 'surat_id'];


    /**
     * Get the surat that owns the Lampiran
     */
    public function surat() 
    {
        return $this->belongsTo(Surat::class);
    }
}
