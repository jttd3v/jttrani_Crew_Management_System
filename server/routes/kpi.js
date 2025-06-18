import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/joining-ratio', async (req, res) => {
  const { month } = req.query; // format YYYY-MM
  const [expected] = await pool.query(
    `SELECT COUNT(*) as total FROM crew_schedule WHERE DATE_FORMAT(join_date,'%Y-%m')=?`,
    [month]
  );
  const [joined] = await pool.query(
    `SELECT COUNT(*) as total FROM crew WHERE DATE_FORMAT(joined_on,'%Y-%m')=?`,
    [month]
  );
  res.json({ expected: expected[0].total, joined: joined[0].total });
});

router.get('/retention-rate', async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as retained FROM crew WHERE contracts_completed>=2 OR TIMESTAMPDIFF(MONTH, joined_on, NOW())>=12`
  );
  const [total] = await pool.query(`SELECT COUNT(*) as total FROM crew`);
  const rate = total[0].total ? rows[0].retained / total[0].total : 0;
  res.json({ rate });
});

router.get('/incidents', async (req, res) => {
  const { start, end } = req.query; // YYYY-MM
  const [rows] = await pool.query(
    `SELECT DATE_FORMAT(date,'%Y-%m') as month, COUNT(*) as count FROM incidents
     WHERE type IN ('P&I','safety') AND date BETWEEN ? AND ?
     GROUP BY month ORDER BY month`
  , [start + '-01', end + '-31']);
  res.json(rows);
});

export default router;
