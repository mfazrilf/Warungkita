const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

initializeDatabase();

app.listen(port, () => {
  console.log(`WarungKita backend berjalan di http://localhost:${port}`);
});
