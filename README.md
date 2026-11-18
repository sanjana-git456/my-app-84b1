# SeniorConnect

SeniorConnect is a SaaS‑style web application that helps seniors and their caregivers manage appointments, medication schedules, and health‑device data in one secure place.

## Tech Stack
- **Backend**: Django 5 + Django REST Framework + Simple JWT
- **Frontend**: React (Vite) + TailwindCSS + React Query + Axios
- **Database**: PostgreSQL (fallback SQLite for local dev)

## Getting Started
### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # edit if needed
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # edit VITE_API_URL if backend runs elsewhere
npm run dev
```
Open http://localhost:5173 in your browser.

## Environment Variables
- `DATABASE_URL` – PostgreSQL connection string (provided below)
- `SECRET_KEY` – Django secret key (default for dev)
- `DEBUG` – `True`/`False`
- `ALLOWED_HOSTS` – comma‑separated list
- `CORS_ORIGINS` – comma‑separated list of allowed origins for the API
- `SEED_DEMO_DATA` – set to `true` to create demo data on first start

## License
MIT
