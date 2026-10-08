# Preview KonveksiKampus ke client melalui Cloudflare Tunnel (cloudflared).
#
# Cara pakai:
#   powershell -ExecutionPolicy Bypass -File scripts/preview.ps1
#
# Script ini:
#   1. Menjalankan `npm run dev` di background (port 3000)
#   2. Membuka tunnel cloudflared dan menampilkan URL publik
#   3. Menghentikan dev server saat Ctrl+C

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Get-Command cloudflared -ErrorAction SilentlyContinue)) {
    Write-Error "cloudflared tidak ditemukan. Install dari https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
    exit 1
}

Write-Host "Menjalankan dev server di http://localhost:3000 ..." -ForegroundColor Cyan
$dev = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -NoNewWindow
Start-Sleep -Seconds 8

try {
    Write-Host "Membuka tunnel cloudflared. Cari URL https://*.trycloudflare.com di bawah:" -ForegroundColor Cyan
    cloudflared tunnel --url http://localhost:3000
}
finally {
    Write-Host "Menghentikan dev server..." -ForegroundColor Yellow
    if ($dev -and -not $dev.HasExited) { Stop-Process -Id $dev.Id -Force }
}
