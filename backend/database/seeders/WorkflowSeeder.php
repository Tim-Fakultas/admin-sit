<?php

namespace Database\Seeders;

use App\Models\JenisSurat;
use App\Models\Role;
use App\Models\Workflow;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkflowSeeder extends Seeder
{
    public function run(): void
    {
        // Mengosongkan tabel untuk menghindari duplikasi
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Workflow::truncate();
        JenisSurat::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Mengambil semua role pejabat yang akan terlibat dalam alur ini
        $roleBagianUmum = Role::where('slug', 'bagian-umum')->first();
        $roleApkapbn = Role::where('slug', 'apkapbn')->first();
        $roleKabagTu = Role::where('slug', 'kabag-tu')->first();
        $roleWadek1 = Role::where('slug', 'wakil-dekan-1')->first();
        $roleDekan = Role::where('slug', 'dekan')->first();

        // 2. Membuat "Nama Alur Kerja" baru
        $workflowSuratAktif = Workflow::create([
            'name' => 'Alur Surat Keterangan Aktif Kuliah',
            'description' => 'Alur lengkap dari Bagian Umum hingga Dekan.'
        ]);

        // 3. Mendefinisikan langkah-langkah persetujuan sesuai urutan
        $workflowSuratAktif->steps()->createMany([
            ['role_id' => $roleBagianUmum->id, 'step' => 1], // Langkah 2 Anda: Verifikasi oleh Bagian Umum
            ['role_id' => $roleApkapbn->id,    'step' => 2], // Langkah 3 Anda: Proses oleh APKAPBN
            ['role_id' => $roleKabagTu->id,    'step' => 3], // Langkah 4 Anda: Paraf oleh Kabag TU
            ['role_id' => $roleWadek1->id,     'step' => 4], // Langkah 5 Anda: Paraf oleh Wakil Dekan
            ['role_id' => $roleDekan->id,      'step' => 5], // Langkah 6 Anda: Tanda tangan oleh Dekan
        ]);

        // 4. Membuat Jenis Surat dan menghubungkannya ke alur kerja ini
        JenisSurat::create([
            'name' => 'Surat Keterangan Aktif Kuliah',
            'description' => 'Surat untuk menyatakan bahwa mahasiswa masih aktif kuliah.',
            'workflow_id' => $workflowSuratAktif->id,
        ]);

        $this->command->info('Workflow for Surat Aktif Kuliah has been seeded!');

        // Anda bisa menambahkan definisi workflow untuk surat lain di bawah sini
    }
}
