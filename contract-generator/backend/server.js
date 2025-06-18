const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'crew_management',
});

// Fetch vessels
app.get('/api/vessels', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM vessels');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Fetch ranks
app.get('/api/ranks', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM ranks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Fetch salary scale for rank/vessel/year
app.get('/api/salary', async (req, res) => {
  const { rankId, vesselId, year } = req.query;
  try {
    const [rows] = await pool.query(
      'SELECT amount FROM salary_scales WHERE rank_id=? AND vessel_id=? AND year=?',
      [rankId, vesselId, year]
    );
    res.json(rows[0] || { amount: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Create contract entry and return ID
app.post('/api/contracts', async (req, res) => {
  const { vesselId, rankId, salary, duration, content } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO contracts (vessel_id, rank_id, salary, duration, content) VALUES (?, ?, ?, ?, ?)',
      [vesselId, rankId, salary, duration, content]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
