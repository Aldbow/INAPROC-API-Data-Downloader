# INAPROC API Data Downloader
Website sederhana untuk mengambil data pengadaan dari INAPROC API Gateway dan mengunduhnya sebagai CSV.

Live Demo: https://inaproc-api-downloader.vercel.app

## Cara Download
- Opsi 1 (Git): `git clone https://github.com/deniganda/INAPROC-API-Downloader.git`
- Opsi 2 (ZIP): buka repo di GitHub, klik `Code` lalu pilih `Download ZIP`.

## Cara Menjalankan Secara Lokal
1) Pastikan file `index.html` sudah ada di komputer.
2) Buka `index.html` langsung di browser (double click), atau jalankan server lokal:
   - `python -m http.server 8080`
   - lalu buka `http://localhost:8080`

## Cara Penggunaan
1) Isi token API dari https://data.inaproc.id/portal/
2) Pilih endpoint data.
3) Isi parameter yang tersedia.
4) Klik `Show Data` untuk menampilkan data atau `Download Data` untuk mengunduh CSV.
