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
        Schema::create('jenissurats', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Contoh: "Surat Keterangan Aktif Kuliah", "Penerbitan Ijazah", "Transkrip Nilai"
            $table->text('description')->nullable();
            $table->json('required_fields')->nullable(); // Opsional: untuk mendefinisikan field apa saja yg dibutuhkan untuk surat jenis ini
            $table->foreignId('workflow_id')->nullable()->constrained('workflows');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jenissurats');
    }
};
