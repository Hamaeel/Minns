# Saves every photo from the current Minns Water Sports Google Site into assets\images
# and points index.html to the local copies.
# Run once (right-click > Run with PowerShell) from this folder before uploading the site to new hosting.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force -Path "assets\images" | Out-Null
$html = Get-Content "index.html" -Raw
$lines = Get-Content "image-urls.txt" | Where-Object { $_ -ne "" }
foreach ($line in $lines) {
  $parts = $line.Split("|")
  $u = $parts[0]; $name = $parts[1]
  $dest = "assets\images\$name"
  if (-not (Test-Path $dest)) { Invoke-WebRequest -Uri $u -OutFile $dest -UseBasicParsing; Write-Host "Saved $name" }
  $html = $html.Replace($u, "assets/images/$name")
}
Set-Content "index.html" $html -Encoding UTF8
Write-Host "Done. index.html now uses local images."
