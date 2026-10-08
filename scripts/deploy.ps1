# Deploy produksi KonveksiKampus ke Netlify (static export).
#
# Cara pakai:
#   powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1
#
# Prasyarat (sekali saja):
#   npx netlify-cli login
#   npx netlify-cli init        # tautkan folder ini ke site Netlify (publish: out)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Build static export..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build gagal."; exit 1 }

Write-Host "Deploy ke Netlify (production)..." -ForegroundColor Cyan
npx --yes netlify-cli deploy --prod --dir=out
