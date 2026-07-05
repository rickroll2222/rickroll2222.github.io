param(
    [Parameter(Mandatory=$true)][string]$FilePath
)

if (-not (Test-Path $FilePath)) { Write-Error "File not found: $FilePath"; exit 1 }

$size = (Get-Item $FilePath).Length
$chunkMB = [math]::Ceiling(($size / 6) / 1MB)
Write-Output "Splitting $FilePath (size=$size bytes) into ~6 parts of $chunkMB MB each"

$dir = Split-Path $FilePath
& "$PSScriptRoot\split-large-files.ps1" -Path $dir -ChunkSizeMB $chunkMB
