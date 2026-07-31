const express = require('express');
const router = express.Router();
const { db } = require('./db');

router.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Gagal memuat produk' });
    }
    res.json(rows);
  });
});

router.post('/products', (req, res) => {
  const { name, category, price, stock, unit, min_stock_alert } = req.body;
  if (!name || !category || price == null || stock == null || !unit || min_stock_alert == null) {
    return res.status(400).json({ error: 'Semua field produk wajib diisi' });
  }

  db.run(
    'INSERT INTO products (name, category, price, stock, unit, min_stock_alert) VALUES (?, ?, ?, ?, ?, ?)',
    [name, category, price, stock, unit, min_stock_alert],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Gagal menambahkan produk' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.put('/products/:id/stock', (req, res) => {
  const productId = req.params.id;
  const { adjustment } = req.body;

  if (adjustment == null || !Number.isInteger(adjustment)) {
    return res.status(400).json({ error: 'Penyesuaian stok harus berupa bilangan bulat' });
  }

  db.get('SELECT stock FROM products WHERE id = ?', [productId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Gagal memuat produk' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    const newStock = row.stock + adjustment;
    if (newStock < 0) {
      return res.status(400).json({ error: 'Stok tidak boleh negatif' });
    }

    db.run('UPDATE products SET stock = ? WHERE id = ?', [newStock, productId], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Gagal memperbarui stok' });
      }
      res.json({ id: productId, stock: newStock });
    });
  });
});

router.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Gagal memuat transaksi' });
    }
    res.json(rows);
  });
});

router.post('/transactions', (req, res) => {
  const { customer_name, total_amount, status } = req.body;
  if (!customer_name || total_amount == null || !status) {
    return res.status(400).json({ error: 'Semua field transaksi wajib diisi' });
  }

  const createdAt = new Date().toISOString();
  db.run(
    'INSERT INTO transactions (customer_name, total_amount, status, created_at) VALUES (?, ?, ?, ?)',
    [customer_name, total_amount, status, createdAt],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Gagal menyimpan transaksi' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

module.exports = router;
