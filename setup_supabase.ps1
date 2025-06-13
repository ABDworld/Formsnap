# setup_supabase.ps1

Write-Host "`n🔧 Vérification de Supabase CLI..." -ForegroundColor Cyan

$npmPrefix = npm config get prefix
$supabasePath = Join-Path $npmPrefix "supabase.cmd"
$npmBinPath = $npmPrefix

if (-not (Test-Path $supabasePath)) {
    Write-Host "📦 Supabase CLI non trouvé, installation..." -ForegroundColor Yellow
    npm install -g supabase
} else {
    Write-Host "✅ Supabase CLI déjà installé." -ForegroundColor Green
}

# Vérifie si le path npm est déjà dans le PATH utilisateur
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$npmBinPath*") {
    Write-Host "🔧 Ajout de $npmBinPath au PATH utilisateur..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$npmBinPath", "User")
    Write-Host "✅ PATH mis à jour. Redémarre ton terminal pour que les changements soient pris en compte." -ForegroundColor Green
} else {
    Write-Host "✅ Le chemin npm global est déjà dans ton PATH." -ForegroundColor Green
}

# Vérifie que la commande fonctionne
Write-Host "`n📎 Test de la commande 'supabase --version'..." -ForegroundColor Cyan
Start-Sleep -Seconds 2
supabase --version