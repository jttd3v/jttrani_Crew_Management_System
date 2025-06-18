import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

const sanitize = (str = '') => String(str).replace(/[<>]/g, '');

router.post('/applications', async (req, res) => {
  const {
    fullName,
    birthdate,
    nationality,
    email,
    contactNumber,
    address,
    sid,
    passport,
    seamanBook,
    rank,
    vesselPref,
    availabilityDate,
    experience,
    trainings
  } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      `INSERT INTO seafarer_applications (
        full_name, birthdate, nationality, email, contact_number,
        address, sid, passport_no, seamans_book_no, rank_applied,
        vessel_pref, availability_date, experience, trainings,
        ip_address, submitted_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
      [
        sanitize(fullName),
        birthdate,
        sanitize(nationality),
        sanitize(email),
        sanitize(contactNumber),
        sanitize(address),
        sanitize(sid),
        sanitize(passport),
        sanitize(seamanBook),
        sanitize(rank),
        sanitize(vesselPref),
        availabilityDate,
        sanitize(experience),
        sanitize(trainings),
        req.ip
      ]
    );
    res.json({ message: 'Application received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/applications', async (req, res) => {
  if (req.headers['x-admin'] !== 'true') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT id, full_name, email, submitted_at, ip_address FROM seafarer_applications ORDER BY submitted_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
