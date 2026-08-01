-- WarungKita Database Schema
-- Database file: warungkita.db

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL,
  unit TEXT NOT NULL,
  min_stock_alert INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  total_amount REAL NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO products (name, category, price, stock, unit, min_stock_alert) VALUES
  ('Beras Premium 5kg', 'Sembako', 65000, 20, 'sak', 5),
  ('Minyak Goreng 1L', 'Sembako', 18000, 15, 'botol', 5),
  ('Gula Pasir 1kg', 'Sembako', 17000, 25, 'bungkus', 8),
  ('Telur Ayam 1kg', 'Sembako', 28000, 10, 'kg', 5),
  ('Kopi Kapal Api 1kg', 'Minuman', 45000, 12, 'bungkus', 4),
  ('Teh Pucuk Harum', 'Minuman', 3500, 40, 'botol', 10),
  ('Mie Instan Goreng', 'Makanan Instan', 3500, 50, 'bungkus', 15),
  ('Kecap Manis Bango', 'Bumbu', 32000, 8, 'botol', 3);

INSERT INTO transactions (customer_name, total_amount, status, created_at) VALUES
  ('Budi Santoso', 98000, 'selesai', '2026-07-31T09:15:00.000Z'),
  ('Siti Aminah', 45000, 'selesai', '2026-07-31T10:30:00.000Z'),
  ('Ahmad Hidayat', 123500, 'selesai', '2026-07-31T13:45:00.000Z'),
  ('Dewi Lestari', 28000, 'proses', '2026-07-31T15:20:00.000Z'),
  ('Joko Widodo', 65000, 'selesai', '2026-08-01T08:05:00.000Z');
