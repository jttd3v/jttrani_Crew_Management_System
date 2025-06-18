const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'crew_management',
});

// Submit application
app.post('/api/applications', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ts = new Date();
  const {
    fullName,
    birthdate,
    nationality,
    email,
    contactNumber,
    address,
    sid,
    passportNo,
    seamansBookNo,
    rank,
    vesselPref,
    availabilityDate,
    experience,
    trainings,
  } = req.body;

  if (!fullName || !birthdate || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      `INSERT INTO seafarer_applications 
      (full_name, birthdate, nationality, email, contact_number, address, sid, passport_no, seamans_book_no, rank_applied, vessel_pref, availability_date, experience, trainings, submitted_at, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        birthdate,
        nationality,
        email,
        contactNumber,
        address,
        sid,
        passportNo,
        seamansBookNo,
        rank,
        vesselPref,
        availabilityDate,
        experience,
        trainings,
        ts,
        ip,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// List applications (admin only)
app.get('/api/applications', async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM seafarer_applications ORDER BY submitted_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Application API running on port ${PORT}`);
});
