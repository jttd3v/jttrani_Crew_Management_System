# Salary Scale Manager

This module provides a simple interface for maintaining yearly salary scale data by crew rank. It includes a React based front end and a small Node.js backend that exposes REST endpoints. Data is persisted in MySQL.

## Folder structure

- `frontend/` – React components powered by vanilla ES modules and Bootstrap 5.
- `backend/` – Express API that performs CRUD operations on the `salary_scales` table.

## Setup

1. Ensure Node.js and MySQL are installed. When running locally via XAMPP, MySQL should already be available.
2. In `backend/` run `npm install` to install dependencies.
3. Create a `.env` file in `backend/` with database credentials (see `server.js`).
4. Start the API with `node server.js`.
5. Open `frontend/index.html` in a browser to access the manager.

This module is independent from the dashboard and contract generator, but uses the same `salary_scales` table.
