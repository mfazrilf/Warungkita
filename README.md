# WarungKita

Website e-commerce sembako dan dashboard admin untuk manajemen stok dan transaksi.

## Struktur Project

- `frontend/` : Next.js + Tailwind CSS storefront dan dashboard admin, terhubung ke Supabase.
- `backend/` : Express + SQLite (reference lama, tidak dipakai di deploy Vercel).
- `supabase/schema.sql` : SQL untuk membuat tabel di Supabase.

## Menjalankan proyek (lokal)

1. Buat file `frontend/.env.local` (contoh di `frontend/.env.example`):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://klldpybmikxbtnopskyo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsbGRweWJtaWt4YnRub3Bza3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1Nzc5ODcsImV4cCI6MjEwMTE1Mzk4N30.-tD-4EjMiyEbSbry5sRqIYIutafyJmYoEYXB7CwKTf4
   ```

2. Jalankan SQL di `supabase/schema.sql` pada Supabase Dashboard > SQL Editor.

3. `cd frontend && npm install && npm run dev`

   Aplikasi berjalan di `http://localhost:3000`.

## Deploy ke Vercel

1. Push repository ke GitHub.
2. Buka https://vercel.com dan buat project baru, pilih repository `WarungKita`.
3. Set **Root Directory** ke `frontend` (Framework Preset: Next.js).
4. Tambahkan **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Klik **Deploy**.

## API Routes (Next.js)

- `GET /api/products`, `POST /api/products`
- `PUT /api/products/:id/stock`
- `GET /api/transactions`, `POST /api/transactions`

## Database Supabase

Tabel: `products` dan `transactions`. Jalankan `supabase/schema.sql` untuk membuat tabel + seed data + RLS policy (anon read/write untuk demo).
