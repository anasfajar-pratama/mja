# Implementasi & Deployment — MJA CMS ke Hostinger

Panduan langkah demi langkah menaikkan **MJA CMS** (Laravel + React) ke hosting **Hostinger**.

---

## 1. Ringkasan arsitektur

- **Backend:** Laravel 12 (REST API + auth Sanctum + upload).
- **Frontend:** React (Vite) — **sudah di-build** ke `backend/public/app`, jadi **tidak butuh Node.js di server**.
- **Database:** MySQL.
- **Satu server, satu domain:** Laravel menyajikan API (`/api`), gambar (`/storage`), dan SPA (`/app`). Root `/` otomatis redirect ke `/app`.

```
public_html  (document root)  ->  mja-app/public
                                   ├─ index.php      (front controller Laravel)
                                   ├─ app/            (SPA React hasil build)
                                   ├─ .htaccess
                                   └─ storage/        (symlink -> ../../storage/app/public)
mja-app/                     (di luar public_html — isi project Laravel)
   ├─ app/  bootstrap/  config/  database/  routes/  storage/  vendor/  .env
```

---

## 2. Yang dibutuhkan

- Paket Hostinger dengan **PHP 8.2+** dan **MySQL** (Premium / Business / VPS). **SSH sangat disarankan** (Business ke atas).
- Domain aktif + akses **hPanel**.
- Akses File Manager / FTP (mis. FileZilla).

> Ekstensi PHP yang perlu aktif (hPanel → Advanced → PHP Configuration): `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `zip`, `curl`, `ctype`, `tokenizer`, `xml`, `bcmath`, `dom`.

---

## 3. Build frontend di komputer lokal (sebelum upload)

```powershell
cd F:\MJA\mja\frontend
npm install --include=dev
npm run build        # hasil masuk ke ../backend/public/app
```

Pastikan terbentuk:
```
backend/public/app/index.html
backend/public/app/assets/*.css
backend/public/app/assets/*.js
```

---

## 4. Siapkan berkas untuk diupload

Yang diupload = **isi folder `backend/`**:

```
app/  bootstrap/  config/  database/  public/  resources/  routes/  storage/
artisan  composer.json  composer.lock  .htaccess (di dalam public/)
```

**Jangan upload:** `node_modules/`, folder `frontend/`, `.git/`, `backend/.env` lokal.

Yang perlu diperhatikan:
- Sertakan **`backend/storage/app/public/media/`** (gambar sudah terisi) agar gambar langsung tampil tanpa impor ulang.
- **`vendor/`**: kalau server bisa menjalankan Composer via SSH, tidak perlu diupload. Kalau tidak ada Composer, **wajib upload `vendor/`** dari lokal.
- `.env` **jangan** diupload — dibuat baru di server (langkah 7).

---

## 5. Upload ke Hostinger

### Opsi A — Document root diarahkan ke `public/` (disarankan)

1. Upload isi `backend/` ke `/home/uXXXXXX/mja-app/` (di **luar** `public_html`).
2. hPanel → **Websites → domain Anda → pengaturan website** → ubah **Document Root / Website Root Directory** ke `mja-app/public`
   (label persis bisa berbeda tergantung tampilan hPanel; cari opsi *Change website root directory*). Jika domain utama tidak bisa diubah, buat **subdomain** lalu atur root-nya ke `mja-app/public`.

   Alternatifnya, arahkan root ke `/home/uXXXXXX/mja-app/public` saat membuat Subdomain.

### Opsi B — Isi `public/` dipindah ke `public_html/` (fallback universal)

Bila document root tidak bisa diubah:

1. Upload seluruh project ke `/home/uXXXXXX/mja-app/`.
2. Pindahkan **semua isi** `mja-app/public/` (`index.php`, `app/`, `.htaccess`, `favicon.ico`, dll) ke `public_html/`.
3. Edit `public_html/index.php`, sesuaikan dua baris require ke lokasi `mja-app`:
   ```php
   require __DIR__.'/../mja-app/vendor/autoload.php';
   $app = require_once __DIR__.'/../mja-app/bootstrap/app.php';
   ```
4. Symlink storage dibuat di `public_html` (lihat langkah 10).

---

## 6. Buat database MySQL

hPanel → **Databases → MySQL Databases**:
1. Buat database, mis. `uXXXXXX_mja_cms`.
2. Buat user + password, lalu **assign** ke database (All Privileges).
3. Catat: **host** (biasanya `localhost`), **nama DB**, **user**, **password**.

---

## 7. Konfigurasi `.env` di server

Buat file `mja-app/.env` (bisa copy dari `.env.example` lalu edit):

```env
APP_NAME="MJA CMS"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://domainanda.com

APP_LOCALE=id
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=id_ID

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=uXXXXXX_mja_cms
DB_USERNAME=uXXXXXX_mja
DB_PASSWORD=passwordAnda

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

FRONTEND_URL=https://domainanda.com
SANCTUM_STATEFUL_DOMAINS=domainanda.com

LOG_CHANNEL=stack
LOG_LEVEL=error
```

Generate kunci aplikasi:
```bash
php artisan key:generate
```

> Tanpa `APP_KEY`, login admin dan enkripsi akan gagal.

---

## 8. Install Composer (via SSH)

**Kalau SSH tersedia:**
```bash
cd ~/mja-app
composer install --no-dev --optimize-autoloader
```
Jika kehabisan memori:
```bash
COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader
```
Jika `composer` belum ada, unduh dulu:
```bash
php -r "copy('https://getcomposer.org/installer','composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
php composer.phar install --no-dev --optimize-autoloader
```

**Kalau tidak ada SSH/Composer:** upload folder `vendor/` dari komputer lokal.

---

## 9. Migrasi database & seeder awal

```bash
cd ~/mja-app
php artisan migrate --force
php artisan db:seed --force
```

Seeder mengisi seluruh konten dari `index3.html` + membuat admin default:
- **Email:** `admin@mja.local`
- **Password:** `admin12345`  → **GANTI setelah login.**

> `db:seed` akan mencoba impor media dari `../assets` (tidak ada di server) dan hanya memberi peringatan — aman. Gambar tetap tampil karena `storage/app/public/media/` ikut diupload (langkah 4).

Alternatif sekali jalan (⚠️ menghapus semua data): `php artisan migrate:fresh --seed --force`.

---

## 10. Storage link (agar `/storage/...` bisa diakses)

```bash
cd ~/mja-app
php artisan storage:link
```

Kalau symlink diblokir (kebijakan shared hosting):
```bash
cd ~/mja-app/public
ln -s ../storage/app/public storage      # buat symlink manual
```
Jika benar-benar tidak bisa, gambar bisa disajikan lewat route khusus — beri tahu saya untuk menambahkannya ke `routes/web.php`.

---

## 11. Permission

```bash
cd ~/mja-app
chmod -R 775 storage bootstrap/cache
```
(Hostinger biasanya sudah ±755; yang penting folder `storage`, `storage/app/public`, `bootstrap/cache` **writable** oleh web server.)

---

## 12. Optimasi produksi

```bash
cd ~/mja-app
php artisan optimize:clear       # bersihkan cache lama (terutama setelah ubah .env)
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

> Setiap kali mengubah `.env`, jalankan `php artisan config:clear` (atau `optimize:clear`) lalu cache ulang.

---

## 13. SSL & HTTPS

hPanel → **Security → SSL** → pasang **Let's Encrypt** untuk domain, lalu aktifkan **Force HTTPS**.
Pastikan `APP_URL` memakai `https://`.

---

## 14. Uji coba setelah go-live

| Uji | Harapan |
|---|---|
| `https://domainanda.com` | redirect ke `/app`, situs tampil |
| `https://domainanda.com/app` | landing page (hero, layanan, galeri) |
| `https://domainanda.com/storage/media/img01.webp` | gambar logo tampil (200) |
| `https://domainanda.com/app/admin/login` | halaman login admin |
| Login admin | bisa masuk dashboard & edit konten |
| Tombol WhatsApp & peta | berfungsi |
| Refresh `.../app/admin/settings` | tidak 404 (SPA catch-all) |

---

## 15. Update setelah go-live (redeploy)

1. Ubah kode di lokal → `cd frontend && npm run build`.
2. Upload ulang `backend/public/app` (dan file yang berubah) ke server.
3. Jika ada perubahan database: `php artisan migrate --force`.
4. Jika `.env` berubah: `php artisan optimize:clear && php artisan config:cache`.

---

## 16. Backup

- hPanel → **Files → Backups** (aktifkan backup otomatis mingguan).
- Export database berkala via **phpMyAdmin → Export**.
- Simpan folder `storage/app/public/media` (gambar hasil upload) di backup Anda.

---

## 17. Troubleshooting

| Gejala | Penyebab & solusi |
|---|---|
| **500 / "Whoops"** | Cek `mja-app/storage/logs/laravel.log`. Umumnya `.env` salah (DB), `APP_KEY` kosong, atau permission `storage` belum 775. |
| **Gambar tidak muncul** | `storage:link` belum dibuat, permission salah, atau `APP_URL` keliru. |
| **CSS/JS blank / mixed content** | Pastikan `public/app` terupload utuh dan situs diakses via **https**. |
| **404 saat refresh `/app/...`** | Mod rewrite belum aktif / `.htaccess` tidak terbaca. Pastikan `AllowOverride All` dan file `.htaccess` ada di document root. |
| **Halaman putih di `/app`** | Build frontend belum diupload atau `index.html` tidak ada di `public/app`. |
| **`/api/site` error 500** | MySQL mati atau kredensial DB salah. |
| **Composer out of memory** | `COMPOSER_MEMORY_LIMIT=-1 composer install ...`. |
| **Tidak bisa upload gambar besar** | Naikkan `upload_max_filesize` & `post_max_size` di PHP Configuration. |
| **`[vite] http proxy error`** | Hanya muncul di **dev lokal** (backend belum jalan), tidak muncul di produksi. |

---

## 18. Checklist go-live ✅

- [ ] `npm run build` selesai → `backend/public/app` terisi
- [ ] Isi `backend/` + `storage/app/public/media` + `vendor/` terupload
- [ ] Database MySQL dibuat & user di-assign
- [ ] `.env` produksi benar (`APP_ENV=production`, `APP_DEBUG=false`, `APP_KEY`, DB, `APP_URL`)
- [ ] `composer install --no-dev` (atau vendor diupload)
- [ ] `php artisan migrate --force` + `php artisan db:seed --force`
- [ ] `php artisan storage:link`
- [ ] Permission `storage` & `bootstrap/cache` = 775
- [ ] `config:cache` / `route:cache` / `view:cache`
- [ ] SSL aktif + Force HTTPS
- [ ] **Ganti password admin default** (`admin@mja.local`)
- [ ] Uji: halaman publik, galeri, WhatsApp, peta, login admin, upload gambar
- [ ] Ganti logo/favicon lewat **Pengaturan Situs** bila perlu
- [ ] Backup otomatis aktif

---

## 19. Opsional: situs langsung di root domain

Saat ini `https://domainanda.com` redirect ke `https://domainanda.com/app`.
Jika ingin SPA tampil langsung di `https://domainanda.com` (tanpa `/app`), ubah `backend/routes/web.php`:

```php
Route::get('/', fn () => response()->file(public_path('app/index.html')));
Route::get('/{any}', fn () => response()->file(public_path('app/index.html')))
    ->where('any', '^(?!api|storage|app).*$');
```
Lalu `npm run build` dan upload ulang. (Beri tahu saya bila mau diubahkan.)
