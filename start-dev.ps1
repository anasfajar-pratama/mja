# Jalankan backend (Laravel) + frontend (Vite) sekaligus.
# Pakai: klik kanan > Run with PowerShell, atau:  powershell -ExecutionPolicy Bypass -File .\start-dev.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$root\backend'; php artisan serve --host=127.0.0.1 --port=8000"
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$root\frontend'; npm run dev"

Write-Host ''
Write-Host 'MJA CMS dev berjalan:' -ForegroundColor Green
Write-Host '  Backend  (API)   : http://127.0.0.1:8000'
Write-Host '  Frontend (situs) : http://localhost:5173'
Write-Host '  Admin            : http://localhost:5173/admin/login'
Write-Host ''
Write-Host 'Catatan: Vite mem-proxy /api dan /storage ke backend (port 8000).'
Write-Host 'Jika backend mati, akan muncul "[vite] http proxy error".'
