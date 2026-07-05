Splitting large files for HalfLife_Data
=====================================

This folder includes helper scripts to split large files into smaller parts (and rejoin them) when files exceed hosting limits (~100 MB).

Files
- `split-large-files.ps1` — scans the folder recursively and splits any file larger than the provided chunk size (default 100 MB) into numbered parts named `originalname.ext.part000`, `originalname.ext.part001`, ...
- `join-parts.ps1` — finds `.part###` files and reassembles them back into the original filename.

Usage (Windows PowerShell)

- Split files (example, run from repo root):
  powershell -ExecutionPolicy Bypass -File .\games\HalfLife_Data\split-large-files.ps1 -Path .\games\HalfLife_Data -ChunkSizeMB 100

- Rejoin parts:
  powershell -ExecutionPolicy Bypass -File .\games\HalfLife_Data\join-parts.ps1 -Path .\games\HalfLife_Data

Notes and precautions
- Always keep a backup of original files before splitting. The scripts create new `.partNNN` files and leave the original file intact.
- Splitting game assets may break how the game expects resources to be packaged. Use this only to store or upload parts; reassemble before running the game.
- If you need different chunk sizes, pass `-ChunkSizeMB` to the split script.
