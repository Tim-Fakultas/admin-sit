<?php

namespace Database\Seeders;
use App\Models\Prodi;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Mahasiswa', 'slug' => 'mahasiswa'],
            ['name' => 'Bagian Umum', 'slug' => 'bagian-umum'],
            ['name' => 'APKAPBN', 'slug' => 'apkapbn'],
            ['name' => 'Kabag TU', 'slug' => 'kabag-tu'],
            ['name' => 'Kaprodi Biologi', 'slug' => 'kaprodi-biologi'],
            ['name' => 'Kaprodi Kimia', 'slug' => 'kaprodi-kimia'],
            ['name' => 'Kaprodi SI', 'slug' => 'kaprodi-si'],
            ['name' => 'Wakil Dekan 1', 'slug' => 'wakil-dekan-1'],
            ['name' => 'Dekan', 'slug' => 'dekan'],
        ];
        foreach ($roles as $role) {
            Role::updateOrCreate(['slug' => $role['slug']], $role);
        }

        // Data untuk tabel Prodi
        $prodis = [
            ['nama' => 'Biologi'],
            ['nama' => 'Kimia'],
            ['nama' => 'Sistem Informasi'],
        ];
        foreach ($prodis as $prodi) {
            Prodi::updateOrCreate(['nama' => $prodi['nama']], $prodi);
        }
        $this->command->info('Roles and Prodis seeded.');
    }
}
