param(
    [string]$Path = "./games/HalfLife_Data",
    [int]$ChunkSizeMB = 100
)

$chunkSize = $ChunkSizeMB * 1MB

Get-ChildItem -Path $Path -Recurse -File | Where-Object { $_.Length -gt $chunkSize -and -not ($_.Name -match '\.part\d+$') } | ForEach-Object {
    $fileFull = $_.FullName
    $dir = $_.DirectoryName
    $name = $_.Name
    $index = 0

    Write-Output "Splitting: $fileFull (size: $($_.Length) bytes)"

    $fs = [System.IO.File]::OpenRead($fileFull)
    try {
        while ($true) {
            $buffer = New-Object byte[] $chunkSize
            $read = $fs.Read($buffer, 0, $buffer.Length)
            if ($read -le 0) { break }

            $partName = [System.IO.Path]::Combine($dir, "$name.part{0:D3}" -f $index)
            $out = [System.IO.File]::OpenWrite($partName)
            try { $out.Write($buffer, 0, $read) } finally { $out.Close() }

            Write-Output "  wrote part: $partName ($read bytes)"
            $index++
        }
    } finally {
        $fs.Close()
    }

    Write-Output "Finished splitting $name into $index parts.`n"
}

Write-Output "All done."
