# FrontEnd ERP MIF Maroc

Stack: Vite + React + TypeScript
Port: 3000
Backend base URL is configured via `.env` (VITE_API_BASE_URL)

Quick start:
- Copy .env.example or use provided `.env`
- Install deps and run dev server

Env:
- VITE_API_BASE_URL=http://localhost:8000

Run:
- npm install
- npm run dev

Build:
- npm run build

Notes:
- Auth tries backend first at /api/v1/auth/login and /api/v1/auth/me. If backend isn’t reachable, demo login works with users: admin/admin, responsable/responsable, technicien/technicien, client/client.
  # ERP MIF Maroc Complete UI Application

  This is a code bundle for ERP MIF Maroc Complete UI Application. The original project is available at https://www.figma.com/design/1mmDvhVNNGLSbQFFLCvb59/ERP-MIF-Maroc-Complete-UI-Application.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  