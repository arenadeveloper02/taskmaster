# Repository Summary: TaskMaster

> Auto-maintained by Sim Development. Last updated: 2026-06-25T06:55:09.448Z.

## Overview

A comprehensive task management web application with authentication, role-based access control, task/user/category management, and productivity tracking for teams.

**Repository:** `taskmaster`  
**File count:** 40

## Features

- JWT authentication with login, register, forgot password
- Role-based access control (Admin, Manager, Member)
- Dashboard with live stats and charts
- Task management with filtering, sorting, assignment
- User management with role assignment
- Category management
- Settings with theme support
- Responsive design with Tailwind CSS and shadcn/ui
- Neon Postgres + Prisma database

## Tech Stack

- Next.js ^15.3.3 (App Router)
- React ^19.0.0
- Tailwind CSS v3
- TypeScript
- Prisma + PostgreSQL (Neon on Vercel)

## Infrastructure

- **Neon project ID:** `long-moon-54445861` — managed by Sim Development; do not delete or replace
- **DATABASE_URL:** set on Vercel when Neon is connected — do not commit real credentials

## Routes & Pages

- `/` — `app/page.tsx`
- `/categories` — `app/categories/page.tsx`
- `/dashboard` — `app/dashboard/page.tsx`
- `/forgot-password` — `app/forgot-password/page.tsx`
- `/login` — `app/login/page.tsx`
- `/register` — `app/register/page.tsx`
- `/settings` — `app/settings/page.tsx`
- `/tasks` — `app/tasks/page.tsx`
- `/users` — `app/users/page.tsx`

## Database Models

- `User`
- `Category`
- `Task`

## File Inventory

### App pages

- `app/categories/page.tsx`
- `app/dashboard/page.tsx`
- `app/forgot-password/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/login/page.tsx`
- `app/page.tsx`
- `app/register/page.tsx`
- `app/settings/page.tsx`
- `app/tasks/page.tsx`
- `app/users/page.tsx`

### API routes

- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/register/route.ts`

### Components

- `components/AppShell.tsx`
- `components/CategoriesClient.tsx`
- `components/DashboardClient.tsx`
- `components/ForgotPasswordClient.tsx`
- `components/LoginClient.tsx`
- `components/RegisterClient.tsx`
- `components/SettingsClient.tsx`
- `components/TasksClient.tsx`
- `components/UsersClient.tsx`

### Libraries

- `lib/actions.ts`
- `lib/auth.ts`
- `lib/prisma.ts`
- `lib/types.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`

### Config

- `.env.example`
- `.gitignore`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`

### Other

- `README.md`
- `REPO_SUMMARY.md`

## Complete File Index

- `.env.example`
- `.gitignore`
- `README.md`
- `REPO_SUMMARY.md`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/register/route.ts`
- `app/categories/page.tsx`
- `app/dashboard/page.tsx`
- `app/forgot-password/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/login/page.tsx`
- `app/page.tsx`
- `app/register/page.tsx`
- `app/settings/page.tsx`
- `app/tasks/page.tsx`
- `app/users/page.tsx`
- `components/AppShell.tsx`
- `components/CategoriesClient.tsx`
- `components/DashboardClient.tsx`
- `components/ForgotPasswordClient.tsx`
- `components/LoginClient.tsx`
- `components/RegisterClient.tsx`
- `components/SettingsClient.tsx`
- `components/TasksClient.tsx`
- `components/UsersClient.tsx`
- `lib/actions.ts`
- `lib/auth.ts`
- `lib/prisma.ts`
- `lib/types.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest Change

- **Updated at:** 2026-06-25T06:55:09.448Z
- **Request:** App Name: TaskMaster

Purpose:
TaskMaster is a comprehensive task management web application designed to streamline task organization, user management, and productivity tracking for teams of all sizes.

Main Features and User Flows:
1. **Authentication & User Accounts**
   - Login, Register, Forgot Password, Logout
   - Role-Based Access Control (RBAC)
   - Session Management with JWT and Refresh Tokens
   - Email Verification and User Invitation System
   - Optional 2FA (TOTP) Support

2. **Dashboard**
   - Live stats and charts for task tracking
   - Recent and overdue tasks list
   - Top users by completion rate
   - Onboarding for new users

3. **Tasks Management**
   - Task listing, filtering, sorting, and searching
   - Task creation, editing, and deletion
   - Bulk actions and inline status updates
   - Task assignment and priority management

4. **User Management**
   - User listing, creation, editing, and deletion
   - Role assignment and management
   - Profile and account settings

5. **Category Management**
   - Category listing, creation, editing, and deletion
   - Task categorization and live updates

6. **Settings**
   - Theme selection and default task settings
   - Data import/export and clearing options
   - App version and export history

Pages and Routes:
1. **Authentication Pages**
   - /login
   - /register
   - /forgot-password

2. **Main Pages**
   - /dashboard
   - /tasks
   - /users
   - /categories
   - /settings

3. **Profile and Account**
   - /profile
   - /account-settings

Key Components:
- Authentication Context and Reducer
- Protected Route and Role Guard Components
- Task, User, and Category Cards
- Modals for Task, User, and Category Forms
- Charts and Stats Components
- Global Search and Notification Components

Data/State Requirements:
- Global state management using React Context and useReducer
- State slices for tasks, users, categories, settings, and authentication
- Persistent state with localStorage and session management

UI Style and Design Direction:
- Responsive design using Tailwind CSS
- UI components from shadcn/ui
- Icons from Lucide React
- Card-based layout with smooth transitions
- Dark and light theme support

Authentication Needs:
- Secure password handling with bcrypt
- JWT-based authentication with refresh tokens
- Role-based access control
- Session persistence and validation
- Email verification and account management

API Routes and Environment Variables:
- Authentication API: /api/auth (login, register, forgot-password, etc.)
- Task API: /api/tasks (CRUD operations)
- User API: /api/users (CRUD operations)
- Category API: /api/categories (CRUD operations)
- Environment variables for API keys, JWT secrets, and database connections

Quality and Security Requirements:
- Zero console errors or warnings
- Fully functional features with no placeholders
- Secure password storage and session management
- Form validation and sanitization
- Role-based route guards and access control
- Activity audit logs and account lockout mechanisms

Additional Enhancements:
- Multi-session handling and activity logs
- User status management (Active/Disabled)
- Profile avatar upload with validation
- Optional 2FA support for enhanced security

This specification ensures TaskMaster is a robust, production-ready task management platform with comprehensive features and security measures.
