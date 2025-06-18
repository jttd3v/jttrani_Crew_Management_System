# Seafarer Application Form

This module provides a mobile friendly form for collecting crew applications. It uses a small Express route integrated with the main API and a React based front end styled with Tailwind CSS.

## Setup

1. Ensure the main API in `server/` is running (see project root README).
2. Open `frontend/index.html` in a browser to access the application form.

Submitted applications are stored in the `seafarer_applications` table and include the submitter's IP address and timestamp for auditing.
