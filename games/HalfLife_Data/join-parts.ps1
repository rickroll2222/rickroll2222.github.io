param(
    [string]$Path = "./games/HalfLife_Data"
)

$parts = Get-ChildItem -Path $Path -Recurse -File | Where-Object { $_.Name -match '\.part\d+$' }
if (-not $parts) { Write-Output "No .part files found under $Path"; exit }

$groups = $parts | Group-Object { [System.IO.Path]::Combine($_.DirectoryName, [regex]::Replace($_.Name, '\.part\d+$','')) }

foreach ($g in $groups) {
    $outPath = $g.Name
    if (Test-Path $outPath) { Write-Output "Skipping existing file: $outPath"; continue }

    Write-Output "Reassembling: $outPath"
    $outFs = [System.IO.File]::OpenWrite($outPath)
    try {
        foreach ($part in ($g.Group | Sort-Object Name)) {
            $inFs = [System.IO.File]::OpenRead($part.FullName)
            try {
                $buffer = New-Object byte[] (4MB)
                while (($read = $inFs.Read($buffer,0,$buffer.Length)) -gt 0) {
                    $outFs.Write($buffer,0,$read)
                }
            } finally { $inFs.Close() }
            Write-Output "  appended $($part.Name)"
        }
    } finally { $outFs.Close() }

    Write-Output "Finished: $outPath`n"
}

Write-Output "All done."
