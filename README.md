# TaskMaster

A comprehensive task management web application for teams — featuring authentication, role-based access control, task/user/category management, and a productivity dashboard.

## Features

- **Authentication** — Login, register, forgot password with JWT + httpOnly cookies
- **Dashboard** — Live stats, charts (status & priority), recent and overdue tasks
- **Tasks** — Create, edit, delete, filter by status/priority, assign to users and categories
- **Users** — Manage team members, roles (Admin/Manager/Member), and account status
- **Categories** — Organize tasks with color-coded categories
- **Settings** — Theme selection (light/dark/system) and default task preferences
- **Responsive** — Mobile-friendly sidebar with dark mode support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Neon Postgres + Prisma ORM
- **Auth**: JWT (jsonwebtoken) + bcryptjs + httpOnly cookies
- **UI**: Tailwind CSS v3, Lucide React icons, Recharts
- **Language**: TypeScript (strict)

## Local Setup

```bash
# 1. Clone and install
git clone https://github.com/your-org/taskmaster
cd taskmaster
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and set DATABASE_URL to your Neon Postgres connection string
# Set JWT_SECRET to a secure random string

# 3. Push schema and seed
npx prisma db push
npx prisma db seed

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Accounts

| Email | Password | Role |
|---|---|---|
| admin@taskmaster.com | admin123 | Admin |
| manager@taskmaster.com | member123 | Manager |
| member@taskmaster.com | member123 | Member |

## Deploy on Vercel

1. Push to GitHub and import into Vercel
2. Connect a Neon Postgres database in the Vercel dashboard
3. Add `JWT_SECRET` to Vercel environment variables
4. Deploy — `prisma generate && prisma db push` runs automatically in the build step
