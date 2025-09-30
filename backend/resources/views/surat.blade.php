<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Keterangan Aktif Kuliah</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            margin: 40px;
        }
        .header {
            text-align: center;
            font-weight: bold;
            text-decoration: underline;
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        .nomor-surat {
            text-align: center;
            margin-bottom: 30px;
        }
        .content-table {
            border-collapse: collapse;
            width: 100%;
        }
        .content-table td {
            padding: 2px 5px;
        }
        .content-table .label {
            width: 30%;
        }
        .content-table .separator {
            width: 5%;
            text-align: center;
        }
        .closing-section {
            margin-top: 30px;
        }
        .signature-section {
            margin-top: 50px;
            width: 300px;
            float: right;
            text-align: left;
        }
        .signature-name {
            margin-top: 60px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="header">
        SURAT KETERANGAN AKTIF KULIAH
    </div>
    <div class="nomor-surat">
        Nomor : {{ $surat->nomor_surat ?? 'B-/Un.09/PP.07/VIII.2/09/2025' }}
    </div>

    <p>Yang bertanda tangan di bawah ini, Dekan Fakultas Sains dan Teknologi UIN Sunan Kalijaga Yogyakarta :</p>

    <table class="content-table">
        <tr>
            <td class="label">N a m a</td>
            <td class="separator">:</td>
            <td>Dr. Muhammad Isnaini, S.Ag., M.Pd</td>
        </tr>
        <tr>
            <td class="label">N I P</td>
            <td class="separator">:</td>
            <td>19720201 200003 1 004</td>
        </tr>
        <tr>
            <td class="label">Pangkat/Golongan/Ruang</td>
            <td class="separator">:</td>
            <td>Pembina Tk. I / IV.b / Lektor Kepala</td>
        </tr>
        <tr>
            <td class="label">J a b a t a n</td>
            <td class="separator">:</td>
            <td>Dekan Fakultas Sains dan Teknologi<br>UIN Sunan Kalijaga Yogyakarta</td>
        </tr>
    </table>

    <p class="closing-section">dengan ini menyatakan dengan sesungguhnya, bahwa :</p>

    <table class="content-table">
        <tr>
            <td class="label">N a m a</td>
            <td class="separator">:</td>
            <td>{{ $surat->user->name }}</td>
        </tr>
        <tr>
            <td class="label">NIM</td>
            <td class="separator">:</td>
            <td>{{ $surat->user->nim_nip }}</td>
        </tr>
        <tr>
            <td class="label">Fakultas</td>
            <td class="separator">:</td>
            <td>Sains dan Teknologi</td>
        </tr>
        <tr>
            <td class="label">Program Studi</td>
            <td class="separator">:</td>
            <td>{{ $surat->user->prodi->nama }}</td>
        </tr>
        <tr>
            <td class="label">Tahun Akademik</td>
            <td class="separator">:</td>
            <td>2025 – 2026</td>
        </tr>
    </table>

    <p class="closing-section">Adalah benar terdaftar sebagai mahasiswa pada Fakultas Sains dan Teknologi UIN Sunan Kalijaga Yogyakarta dan masih aktif sampai dikeluarkan surat ini.</p>

    <p class="closing-section">Demikianlah surat ini dibuat dengan sesungguhnya untuk dapat dipergunakan sebagaimana mestinya.</p>

    <div class="signature-section">
        Yogyakarta, {{ date('d F Y') }}<br>
        Dekan,
        <div class="signature-name">
            Muhammad Isnaini
        </div>
    </div>

</body>
</html>
