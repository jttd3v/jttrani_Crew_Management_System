import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crewdb',
});

const app = express();
app.use(cors());
app.use(express.json());

// List salary scale history for a rank
app.get('/api/salary-scales/:rankId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, year, amount FROM salary_scales WHERE rank_id = ? ORDER BY year DESC',
      [req.params.rankId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Add a new salary scale record
app.post('/api/salary-scales', async (req, res) => {
  const { rankId, year, amount } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO salary_scales (rank_id, year, amount) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE amount = VALUES(amount)',
      [rankId, year, amount]
    );
    res.json({ id: result.insertId || result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Salary Scale API running on port ${PORT}`);
});
