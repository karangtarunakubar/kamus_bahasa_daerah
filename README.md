# kamus_bahasa_daerah
====================

Kamus_Bahasa_Daerah dokumentasi dan pelestarian bahasa Daerah Kalimantan Timur — kamus dua arah (Bahasa Daerah ↔ Indonesia) beserta database:
    
dan panduan penggunaan.


## Tujuan
- Mendokumentasikan kosakata Bahasa Daerah → Indonesia dan Indonesia → Bahasa Daerah.
- Menyediakan format data (SQLite, SQL, CSV) untuk keperluan penelitian, aplikasi kamus, dan distribusi.

## Bahasa yang Didukung

| Kode | Suku |
|---|---|
| `id-ID` | Indonesia |
| `tj-TJ` | Tunjung |
| `ky-KY` | Kenyah |
| `bq-BQ` | Benuaq |
| `bh-BH` | Bahau |
| `kt-KT` | Kutai |

## Isi Repositori

- `kamus_bahasa_daerah.db` — Database SQLite berisi seluruh kamus (siap pakai, sudah terisi data).
- `schema.sql` — Skema database (tabel `languages` dan `dictionary_entries`), portable ke Postgres/MySQL dengan penyesuaian tipe data minor.
- `build_db.py` — Skrip Python yang membangun `kamus_bahasa_daerah.db` dari dataset dan mengekspor CSV.
- `csv_exports/`
  - `tunjung_to_indonesia.csv` — 118 pasangan kata Tunjung → Indonesia.
  - `benuaq_to_indonesia.csv` — 25 pasangan kata Benuaq → Indonesia.
  - `kenyah_to_indonesia.csv` — 25 pasangan kata Kenyah → Indonesia.
  - `bahau_to_indonesia.csv` — 25 pasangan kata Bahau → Indonesia.
  - `kutai_to_indonesia.csv` — 25 pasangan kata Kutai → Indonesia.

**Total: 218 entri kamus** di seluruh 5 bahasa daerah.

## Struktur Database

```sql
CREATE TABLE languages (
    language_code VARCHAR(10) PRIMARY KEY,   -- 'tj-TJ', 'bq-BQ', 'ky-KY', 'bh-BH', 'kt-KT', 'id-ID'
    tribe         VARCHAR(50) NOT NULL,
    date_created  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dictionary_entries (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    language_code   VARCHAR(10) NOT NULL,
    word_daerah     VARCHAR(100) NOT NULL,
    word_indonesia  VARCHAR(100) NOT NULL,
    audio_url       VARCHAR(100),   -- opsional, untuk pengucapan (belum terisi)
    notes           TEXT,           -- opsional, catatan tambahan
    date_created    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(language_code)
);
```

Desain ini dipilih (dibanding satu tabel per bahasa/entri audio) karena setiap kata butuh dua sisi terjemahan (Daerah ↔ Indonesia) dan relasi many-to-one yang jelas ke bahasa asalnya — sehingga query lintas-bahasa dan pencarian dua arah mudah dilakukan.

## Panduan Singkat

1. **Melihat daftar kata cepat**: buka file CSV di folder `csv_exports/` sesuai bahasa yang diinginkan.
2. **Penggunaan programatik**: gunakan `kamus_bahasa_daerah.db` langsung dengan SQLite, atau jalankan `schema.sql` di Postgres/MySQL lalu impor data dari CSV.
3. **Menambah entri baru**: ajukan pull request atau buka issue dengan format:
   `Tunjung,Benuaq,Kenyah,Bahau,Kutai,Indonesia,Catatan`

### Contoh Query

```sql
-- Cari terjemahan kata "Aku" di semua bahasa
SELECT l.tribe, de.word_daerah
FROM dictionary_entries de
JOIN languages l ON l.language_code = de.language_code
WHERE de.word_indonesia = 'Aku';

-- Semua kosakata bahasa Tunjung
SELECT word_daerah, word_indonesia
FROM dictionary_entries
WHERE language_code = 'tj-TJ'
ORDER BY word_daerah;
```

## Kontribusi

- Kontribusi dari penutur asli, ahli bahasa, dan relawan sangat diharapkan.
- Silakan buka issue untuk koreksi ejaan, pelafalan, atau penambahan istilah baru.
- Audio pengucapan (`audio_url`) belum tersedia — kontribusi rekaman audio sangat disambut.

## Penggunaan sebagai Gaya Bahasa AI (System Prompt)

Dataset ini juga bisa dipakai untuk mengkonfigurasi asisten AI agar merespons dengan campuran Bahasa Tunjung:

```
[PERAN & NADA BAHASA]
Anda adalah asisten virtual yang berkomunikasi menggunakan Bahasa Tunjung secara alami.

[ATURAN PENGGUNAAN KOSAKATA]
1. Gunakan entri kata dari Kamus Tunjung yang tersedia sebagai acuan utama tata kata.
2. Jika kata benda atau kata kerja dasar tersedia dalam daftar, utamakan penggunaan kata Tunjung
   (contoh: "Akuq" untuk Aku, "Koi" untuk Kamu, "Kuman" untuk Makan, "Muruq" untuk Minum).
3. Untuk kata pendukung atau struktur kalimat rumit yang belum ada di kamus, gunakan tata bahasa
   Indonesia baku/santai sebagai pembentuk struktur kalimat dasar.
4. Jaga nada bicara agar ramah, komunikatif, dan sesuai dengan konteks percakapan.
```

Features
--------
- Neumorphic style
- Audio
- MultiLanguage


## Lisensi

Dokumen ini memiliki lisensi tersurat. Lihat `LICENSE`.
[LICENSE](https://github.com/karangtarunakubar/kamus_bahasa_daerah/LICENSE.txt)

## Kontak
- 085750733608
- 

- Repo: https://github.com/karangtarunakubar/kamus_tunjung
