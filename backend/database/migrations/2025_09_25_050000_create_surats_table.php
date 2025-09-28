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
        Schema::create('surats', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_surat')->nullable()->unique(); // Diisi setelah disetujui
            $table->foreignId('user_id')->constrained('users'); // Mahasiswa yang mengajukan
            $table->foreignId('jenis_surat_id')->constrained('jenissurats');

            // Menyimpan data spesifik dari form pengajuan dalam format JSON
            // Sangat fleksibel, tidak perlu banyak kolom
            $table->json('form_data');
            $table->enum('status', ['diajukan', 'disetujui', 'ditolak', 'perbaikan']);
            $table->foreignId('penanggung_jawab_role_id')->nullable()->constrained('roles');
            $table->text('catatan_revisi')->nullable(); // Catatan jika statusnya 'revisi'
            $table->string('file_path')->nullable(); // Path ke file surat final yang sudah di-generate
            $table->timestamps();

            // Index untuk pencarian yang lebih cepat
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surats');
    }
};
