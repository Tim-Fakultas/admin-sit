<?php

namespace Database\Seeders;

use App\Models\Prodi;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // === Mengambil Semua Role & Prodi dari Database ===
        $roles = Role::all()->keyBy('slug');
        $prodis = Prodi::all()->keyBy('nama');

        // === 1. Membuat Contoh User untuk Setiap Peran Pejabat (TETAP SAMA) ===
        User::updateOrCreate(['email' => 'umum@test.com'], [
            'nim_nip' => 'NIP001', 'name' => 'Ani (Bagian Umum)', 'ttl' => '1995-03-12',
            'no_telpon' => '081233334444', 'alamat' => 'Jl. Umum No. 3',
            'password' => Hash::make('password'), 'role_id' => $roles['bagian-umum']->id,
        ]);
        User::updateOrCreate(['email' => 'apkapbn@test.com'], [
            'nim_nip' => 'NIP002', 'name' => 'Bambang (APKAPBN)', 'ttl' => '1994-02-15',
            'no_telpon' => '081200000002', 'alamat' => 'Jl. Rektorat No. 2',
            'password' => Hash::make('password'), 'role_id' => $roles['apkapbn']->id,
        ]);
        User::updateOrCreate(['email' => 'kabag.tu@test.com'], [
            'nim_nip' => 'NIP003', 'name' => 'Charlie (Kabag TU)', 'ttl' => '1990-03-15',
            'no_telpon' => '081200000003', 'alamat' => 'Jl. Rektorat No. 3',
            'password' => Hash::make('password'), 'role_id' => $roles['kabag-tu']->id,
        ]);
        User::updateOrCreate(['email' => 'kaprodi.si@test.com'], [
            'nim_nip' => 'NIP004', 'name' => 'Diana (Kaprodi SI)', 'ttl' => '1989-04-15',
            'no_telpon' => '081200000004', 'alamat' => 'Jl. Prodi No. 1',
            'password' => Hash::make('password'), 'role_id' => $roles['kaprodi-si']->id,
        ]);
        User::updateOrCreate(['email' => 'kaprodi.bio@test.com'], [
            'nim_nip' => 'NIP005', 'name' => 'Endah (Kaprodi Biologi)', 'ttl' => '1988-04-15',
            'no_telpon' => '081200000005', 'alamat' => 'Jl. Prodi No. 2',
            'password' => Hash::make('password'), 'role_id' => $roles['kaprodi-biologi']->id,
        ]);
        User::updateOrCreate(['email' => 'kaprodi.kimia@test.com'], [
            'nim_nip' => 'NIP008', 'name' => 'Doni (Kaprodi Kimia)', 'ttl' => '1988-04-13',
            'no_telpon' => '081244445555', 'alamat' => 'Jl. Kimia No. 4',
            'password' => Hash::make('password'), 'role_id' => $roles['kaprodi-kimia']->id,
        ]);
        User::updateOrCreate(['email' => 'wadek1@test.com'], [
            'nim_nip' => 'NIP006', 'name' => 'Fahmi (Wadek 1)', 'ttl' => '1986-06-15',
            'no_telpon' => '081200000006', 'alamat' => 'Jl. Dekanat No. 2',
            'password' => Hash::make('password'), 'role_id' => $roles['wakil-dekan-1']->id,
        ]);
        User::updateOrCreate(['email' => 'dekan@test.com'], [
            'nim_nip' => 'NIP007', 'name' => 'Rina (Dekan)', 'ttl' => '1985-05-14',
            'no_telpon' => '081255556666', 'alamat' => 'Jl. Dekanat No. 5',
            'password' => Hash::make('password'), 'role_id' => $roles['dekan']->id,
        ]);

        // === 2. Membuat 10 User Mahasiswa Secara Manual (DIPERBANYAK) ===
        $mahasiswas = [
            [
                'nim_nip' => '2211001', 'name' => 'Mahasiswa Satu', 'ttl' => '2002-01-01',
                'no_telpon' => '081200000011', 'alamat' => 'Alamat Mahasiswa 1',
                'email' => 'mhs1@test.com', 'prodi_id' => $prodis['Sistem Informasi']->id
            ],
            [
                'nim_nip' => '2211002', 'name' => 'Mahasiswa Dua', 'ttl' => '2002-02-02',
                'no_telpon' => '081200000012', 'alamat' => 'Alamat Mahasiswa 2',
                'email' => 'mhs2@test.com', 'prodi_id' => $prodis['Kimia']->id
            ],
            [
                'nim_nip' => '2211003', 'name' => 'Mahasiswa Tiga', 'ttl' => '2002-03-03',
                'no_telpon' => '081200000013', 'alamat' => 'Alamat Mahasiswa 3',
                'email' => 'mhs3@test.com', 'prodi_id' => $prodis['Biologi']->id
            ],
            [
                'nim_nip' => '2211004', 'name' => 'Mahasiswa Empat', 'ttl' => '2002-04-04',
                'no_telpon' => '081200000014', 'alamat' => 'Alamat Mahasiswa 4',
                'email' => 'mhs4@test.com', 'prodi_id' => $prodis['Sistem Informasi']->id
            ],
            [
                'nim_nip' => '2211005', 'name' => 'Mahasiswa Lima', 'ttl' => '2002-05-05',
                'no_telpon' => '081200000015', 'alamat' => 'Alamat Mahasiswa 5',
                'email' => 'mhs5@test.com', 'prodi_id' => $prodis['Kimia']->id
            ],
            [
                'nim_nip' => '2211006', 'name' => 'Mahasiswa Enam', 'ttl' => '2002-06-06',
                'no_telpon' => '081200000016', 'alamat' => 'Alamat Mahasiswa 6',
                'email' => 'mhs6@test.com', 'prodi_id' => $prodis['Biologi']->id
            ],
            [
                'nim_nip' => '2211007', 'name' => 'Mahasiswa Tujuh', 'ttl' => '2002-07-07',
                'no_telpon' => '081200000017', 'alamat' => 'Alamat Mahasiswa 7',
                'email' => 'mhs7@test.com', 'prodi_id' => $prodis['Sistem Informasi']->id
            ],
            [
                'nim_nip' => '2211008', 'name' => 'Mahasiswa Delapan', 'ttl' => '2002-08-08',
                'no_telpon' => '081200000018', 'alamat' => 'Alamat Mahasiswa 8',
                'email' => 'mhs8@test.com', 'prodi_id' => $prodis['Kimia']->id
            ],
            [
                'nim_nip' => '2211009', 'name' => 'Mahasiswa Sembilan', 'ttl' => '2002-09-09',
                'no_telpon' => '081200000019', 'alamat' => 'Alamat Mahasiswa 9',
                'email' => 'mhs9@test.com', 'prodi_id' => $prodis['Biologi']->id
            ],
            [
                'nim_nip' => '2211010', 'name' => 'Mahasiswa Sepuluh', 'ttl' => '2002-10-10',
                'no_telpon' => '081200000020', 'alamat' => 'Alamat Mahasiswa 10',
                'email' => 'mhs10@test.com', 'prodi_id' => $prodis['Sistem Informasi']->id
            ],
        ];

        foreach ($mahasiswas as $mahasiswa) {
            User::updateOrCreate(
                ['email' => $mahasiswa['email']],
                [
                    'nim_nip' => $mahasiswa['nim_nip'],
                    'name' => $mahasiswa['name'],
                    'ttl' => $mahasiswa['ttl'],
                    'no_telpon' => $mahasiswa['no_telpon'],
                    'alamat' => $mahasiswa['alamat'],
                    'password' => Hash::make('password'),
                    'role_id' => $roles['mahasiswa']->id,
                    'prodi_id' => $mahasiswa['prodi_id'],
                ]
            );
        }

        $this->command->info('A complete set of default users (officials and 10 students) has been seeded!');
    }
}
