<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            $table->enum('document_type', [
                'ktm', 'kk', 'bukti_bayar_spp', 'foto_diri'
            ]);
            $table->string('original_name');
            $table->string('file_path');
            $table->string('file_size');
            $table->string('mime_type');
            $table->boolean('is_verified')->default(false);
            $table->timestamp('uploaded_at');
            
            $table->timestamps();
            
            // Pastikan satu user hanya punya satu dokumen per type
            $table->unique(['user_id', 'document_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_documents');
    }
};