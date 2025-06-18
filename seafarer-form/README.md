# Seafarer Application Form

This module provides a simple form for collecting seafarer applications. It uses a React front end and a Node.js (Express) backend.

## Setup

1. **Backend**
   - Navigate to `backend/` and install dependencies:
     ```bash
     npm install
     ```
   - Provide database credentials and an admin token via environment variables:
     ```ini
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=
     DB_NAME=crew_management
     ADMIN_TOKEN=secret-token
     ```
   - Start the API:
     ```bash
     npm start
     ```
   - The API listens on `http://localhost:3002` by default.

2. **Frontend**
   - Open `frontend/index.html` in your browser. Ensure it can reach the backend API (adjust paths if served from a different host).

## Database

Create a `seafarer_applications` table:
```sql
CREATE TABLE seafarer_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  nationality VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  contact_number VARCHAR(50),
  address TEXT,
  sid VARCHAR(50),
  passport_no VARCHAR(50),
  seamans_book_no VARCHAR(50),
  rank_applied VARCHAR(100),
  vessel_pref VARCHAR(100),
  availability_date DATE,
  experience TEXT,
  trainings TEXT,
  submitted_at DATETIME,
  ip_address VARCHAR(100)
);
```

Admins can fetch submissions by sending a `Bearer` token in the `Authorization` header matching `ADMIN_TOKEN`.
