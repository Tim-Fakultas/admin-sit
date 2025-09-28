<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Prodi extends Model
{
    use HasFactory;

    /**
     * Menentukan nama tabel secara eksplisit.
     */
    protected $table = 'prodis';

    /**
     * Get all of the users for the Prodi
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
