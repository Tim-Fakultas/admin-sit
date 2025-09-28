<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Migrasi: php artisan make:migration create_log_persetujuan_table
        Schema::create('log_persetujuans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surat_id')->constrained('surats')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users'); // Pejabat yang melakukan aksi
            $table->foreignId('role_id')->constrained('roles'); // Peran pejabat saat itu
            $table->string('action'); // Contoh: "Verifikasi Berkas", "Paraf", "Tanda Tangan"
            $table->text('notes')->nullable(); // Catatan dari pejabat
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logpersetujuans');
    }
};
