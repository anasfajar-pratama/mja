# MJA CMS — Laravel (Backend/API) + React (Situs Publik & Admin)

CMS untuk landing page **PT. Magali Jaya Abadi**. Konten dari `index3.html` sudah diimpor sebagai data awal, dan seluruhnya bisa diedit lewat panel admin.

```
mja/
├─ backend/     # Laravel 12 — REST API, auth (Sanctum), upload gambar, MySQL
├─ frontend/    # Vite + React + TypeScript — situs publik + panel admin
├─ assets/      # gambar sumber (dipakai seeder; sudah dikopi ke storage)
├─ index3.html  # acuan desain statis (tidak diubah)
└─ catatan.md
```

## Prasyarat
- PHP 8.2 (XAMPP) + Composer
- MySQL XAMPP (nyala) + database `mja_cms`
- Node.js 18+ / npm

## 1. Menjalankan (mode pengembangan)

**Backend**
```powershell
cd backend
composer install                 # jika clone baru
php artisan migrate:fresh --seed # buat tabel + isi konten + import media
php artisan storage:link         # symlink public/storage -> storage/app/public
php artisan serve                # http://127.0.0.1:8000
```

**Frontend**
```powershell
cd frontend
npm install --include=dev        # PENTING: mesin ini punya npm omit=dev
npm run dev                      # http://localhost:5173
```

Buka **http://localhost:5173** untuk situs publik dan **http://localhost:5173/admin/login** untuk admin.

> Catatan: konfigurasi `.env` backend sudah diarahkan ke MySQL `mja_cms` (user `root`, tanpa password — default XAMPP). Jika MySQL belum jalan, nyalakan dari XAMPP Control Panel. Butuh ekstensi `pdo_mysql` aktif.

**Akun admin default:** `admin@mja.local` / `admin12345` — **wajib diganti** sebelum dipakai publik.

## 2. Build produksi (disajikan Laravel)
```powershell
cd frontend
npm run build     # output ke backend/public/app
```
Lalu akses situs lewat **http://localhost:8000/app** (route Laravel menyajikan SPA). API di `/api`, gambar di `/storage`.

Untuk server produksi: set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL` yang benar, jalankan `php artisan config:cache route:cache`, dan pastikan `php artisan storage:link` sudah dibuat.

## 3. Yang bisa diedit di admin
Dashboard menampilkan ringkasan konten. Menu sidebar:

| Menu | Isi |
|---|---|
| Hero (Slides) | 2 grup hero (gelap/terang), judul, deskripsi, tombol, gambar, statistik & highlights |
| Fitur Unggulan | 4 kartu fitur di bawah hero |
| Layanan | 7 kartu layanan + detail modal (deskripsi, keunggulan, sektor) |
| Customer / Mitra | logo mitra |
| Kategori Galeri & Galeri Foto | tab kategori + foto dokumentasi |
| Legalitas | daftar legalitas perusahaan |
| Nilai ROYAL | 5 nilai budaya kerja |
| Poin Misi | daftar misi |
| FAQ / Testimoni | tanya-jawab & testimoni |
| Baris Kontak / Link Footer | baris kontak & tautan footer |
| Pengaturan Situs | brand, logo, meta/SEO, WhatsApp/telepon/email, judul tiap section, CTA, peta kontak, footer |

Semua gambar di-upload lewat panel (tersimpan di `storage/app/public/media`, disajikan via `/storage`).

## 4. Ringkasan API
**Publik:** `GET /api/site` (semua konten), `/api/settings`, `/api/gallery?category=`, `/api/services/{slug}`

**Admin (Bearer token Sanctum):**
- `POST /api/login` → `{ token }`, `POST /api/logout`, `GET /api/me`
- CRUD: `GET|POST /api/admin/{resource}`, `GET|PUT|DELETE /api/admin/{resource}/{id}`, `PATCH /api/admin/{resource}/reorder`
- `PUT /api/admin/settings`, `POST /api/admin/uploads`, `GET /api/admin/summary`

`{resource}` ∈ `hero-slides, features, services, partners, gallery-categories, gallery-images, legalities, values, mission-items, faqs, testimonials, contact-lines, footer-links` (didefinisikan di `backend/config/cms.php`).

## 5. Menyesuaikan
- **Tambah field/validasi** resource: `backend/config/cms.php` + `frontend/src/admin/resources.ts`.
- **Tampilan situs**: CSS ada di `frontend/src/styles/site.css` (diambil apa adanya dari `index3.html`).
- **Tampilan admin**: `frontend/src/styles/admin.css`.
- **Ganti nomor WhatsApp**: menu Pengaturan Situs (`contact.whatsapp_number`).

## Troubleshooting dev
- **`[vite] http proxy error: /storage/...` atau `/api/...`** → artinya **backend Laravel belum jalan**. Vite hanya mem-proxy `/api` dan `/storage` ke `http://127.0.0.1:8000`. Jalankan backend:
  ```powershell
  cd backend
  php artisan serve
  ```
- **Gambar tidak muncul padahal backend jalan** → pastikan symlink dan file ada:
  ```powershell
  php artisan storage:link
  # file ada di: backend/storage/app/public/media
  ```
- **Jalankan keduanya sekaligus**: `./start-dev.ps1` (membuka dua jendela: Laravel + Vite).
- Pastikan **MySQL XAMPP menyala** (kalau mati, `/api/site` akan error 500).
