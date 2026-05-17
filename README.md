# Seyon Pledge Platform

This repository contains the full stack application for the Seyon Pledge Platform.

## Project Structure

- `seyonPledgeform/`: The frontend application built with Vite, React, and Tailwind CSS.
- `backend/`: The backend API built with Node.js, Express, and Prisma (PostgreSQL).

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### 1. Setup Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials.
4. Run Prisma migrations and generate client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Seed the database (creates admin user):
   ```bash
   npx prisma db seed
   ```
6. Start the server:
   ```bash
   npm run dev
   ```

### 2. Setup Frontend

1. Navigate to the frontend folder:
   ```bash
   cd seyonPledgeform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Admin Access

The admin panel routes are protected. You can log in using the credentials defined in your backend `.env` file (default: `admin@seyon.com` / `admin_password_123`).
