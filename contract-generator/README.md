# Contract Generator Module

This module provides a simple proof-of-concept for generating crew employment contracts.
It uses a React-based front end and a Node.js (Express) backend with MySQL.

## Folder structure

- `frontend/` – Single page application using React and Bootstrap 5.
- `backend/` – Express server exposing REST endpoints for vessel, rank and contract management.

## Setup

1. Install Node.js and MySQL.
2. In `backend/` run `npm install` to install dependencies.
3. Configure database credentials via environment variables as shown in `backend/server.js`.
4. Start the API with `node server.js`.
5. Serve the `frontend/index.html` file using any web server or open it directly.

This is a minimal demonstration and does not include authentication or advanced error handling.
