const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'WarungKita Backend',
    status: 'ok',
    endpoints: ['/api/products', '/api/products/:id/stock', '/api/transactions'],
  });
});

app.use('/api', routes);

initializeDatabase()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
  });

app.listen(port, () => {
  console.log(`WarungKita backend berjalan di http://localhost:${port}`);
});
