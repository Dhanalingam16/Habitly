# Habitly — Full-stack habit tracker

Habitly is a responsive habit-tracking web application built with Next.js App Router, React, TypeScript, Tailwind CSS, Recharts, Prisma, and PostgreSQL.

## Features
- Email/password registration and login with bcrypt password hashing and an HTTP-only signed session cookie
- Per-user habit CRUD (create, edit, delete) with descriptions, color, icon, and frequency
- Persistent daily check-ins stored in PostgreSQL
- Consecutive-day streaks, completion percentage, total check-ins
- Weekly progress charts, 35-day activity heatmap, monthly calendar
- Responsive dashboard, empty states, inline errors, and loading states
- Validated API requests with Zod and per-user ownership checks

## Requirements
- Node.js 20.9+
- npm
- Docker Desktop or a PostgreSQL 16 database

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file:
   ```bash
   cp .env.example .env
   ```
3. Start PostgreSQL:
   ```bash
   docker compose up -d postgres
   ```
4. Replace `JWT_SECRET` in `.env` with a random value of at least 32 characters. You can generate one with:
   ```bash
   openssl rand -base64 32
   ```
5. Generate Prisma client and create tables:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open http://localhost:3000 and create an account.

## API routes
- `GET /api/health`
- `POST /api/auth/register` — `{ "name": "Alex", "email": "alex@example.com", "password": "a-long-password" }`
- `POST /api/auth/login` — `{ "email": "alex@example.com", "password": "a-long-password" }`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/habits`
- `POST /api/habits` — `{ "name": "Read for 10 minutes", "description": "Before bed", "color": "#D9F279", "icon": "book", "frequency": "daily" }`
- `PATCH /api/habits/:id`
- `DELETE /api/habits/:id`
- `PUT /api/habits/:id/checkins` — `{ "date": "YYYY-MM-DD", "completed": true }`
- `GET /api/summary`

## Important notes
This is a runnable project starter, not a security-audited production deployment. Before opening it to the public, add authentication rate limiting, email verification and password reset, automated tests, monitoring, robust session revocation, a managed database with backups, and security review. The monthly calendar currently displays the current month; clicking a date marks the first habit not yet checked off on that date. Weekly-frequency habits are tracked as flexible check-ins, but the streak calculation currently counts consecutive calendar days rather than completed weeks. The dashboard currently uses the local browser date for the daily view.
