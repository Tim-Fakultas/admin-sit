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
            ['role_id' => $roleBagianUmum->id, 'step' => 1],
            ['role_id' => $roleApkapbn->id,    'step' => 2],
            ['role_id' => $roleKabagTu->id,    'step' => 3],
            ['role_id' => $roleWadek1->id,     'step' => 4],
            ['role_id' => $roleDekan->id,      'step' => 5],
        ]);

        // 4. Membuat Jenis Surat dan menghubungkannya ke alur kerja ini
        //    LENGKAP DENGAN SYARAT-SYARATNYA
        JenisSurat::create([
            'name' => 'Surat Keterangan Aktif Kuliah',
            'description' => 'Surat untuk menyatakan bahwa mahasiswa masih aktif kuliah.',
            'workflow_id' => $workflowSuratAktif->id,
            'required_fields' => json_encode([
                'files' => [
                    ['label' => 'Copy KTM Masih Berlaku', 'name' => 'file_ktm'],
                    ['label' => 'Kartu Keluarga', 'name' => 'file_kk'],
                    ['label' => 'Copy Bukti Pembayaran SPP/UKT Semester berjalan', 'name' => 'file_spp'],
                ]
            ]),
        ]);

        $this->command->info('Workflow for Surat Aktif Kuliah has been seeded!');
    }
}
