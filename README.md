# WarungKita

Website e-commerce sembako dan dashboard admin untuk manajemen stok dan transaksi.

## Struktur Project

- `frontend/` : Next.js + Tailwind CSS user storefront dan halaman admin.
- `backend/` : Express + SQLite API untuk produk dan transaksi.

## Menjalankan proyek

1. `cd frontend`
2. `npm install`
3. `npm run dev`

4. `cd ../backend`
5. `npm install`
6. `npm run dev`

Backend default berjalan di `http://localhost:4000`.

## Deploy ke Vercel

1. Push repository ke GitHub.
2. Buka https://vercel.com dan buat project baru.
3. Pilih repository `WarungKita`.
4. Set root project ke folder `frontend`.
5. Gunakan builder `@vercel/next`.
6. Klik Deploy.

> Untuk sekarang, backend disimpan sebagai reference saja. Frontend sudah disiapkan sebagai demo dummy untuk display.
