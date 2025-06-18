# Crew Management System

This repository provides a simple login page and a KPI Dashboard module used for crew management. The dashboard is built with **React** and **Chart.js**, while a small **Node.js** API serves data from MySQL.

## Features

- Responsive login page (demo)
- KPI Dashboard
  - **Joining Ratio** – total crew joined vs. expected onboard per month
  - **Retention Rate** – percentage of crew with at least two contracts or over one year tenure
  - **Incident Trend** – monthly count of P&I or safety incidents
- Utility-first styling with Tailwind CSS
- **Salary Scale Manager** – maintain yearly salary scale history by crew rank

## Setup

### Backend API
1. Install Node.js and MySQL.
2. Create a `.env` file in `server/` with database credentials:
   ```ini
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=secret
   DB_NAME=crewdb
   ```
3. Install dependencies and start the server:
   ```bash
   cd server
   npm install
   npm start
   ```
   The API will run on `http://localhost:3001`.

### Frontend
Open `dashboard/index.html` in your browser. It fetches data from the API endpoints:
- `/api/joining-ratio?month=YYYY-MM`
- `/api/retention-rate`
- `/api/incidents?start=YYYY-MM&end=YYYY-MM`

### Salary Scale Manager
1. Start the salary scale API:
   ```bash
   cd salary-scale-manager/backend
   npm install
   npm start
   ```
   The API will run on `http://localhost:3002`.
2. Open `salary-scale-manager/frontend/index.html` in your browser to manage yearly salary scales by rank.

## Development
Pull requests are welcome. Please open an issue first to discuss changes.

