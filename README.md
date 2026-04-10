<div align="center">

# Clinic Logbook System

**A QR-based clinic logbook system for the PSHS-IRC School Clinic**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/altheopacheco/clinic-logbook-system)

A modern, web-based logbook application that streamlines the process of tracking student visits to a school clinic. Featuring QR code scanning for instant check-ins/outs, a real-time dashboard, and comprehensive data management tools.

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Logging In](#logging-in)
  - [Dashboard](#dashboard)
  - [QR Code Scanner](#qr-code-scanner)
  - [Student Management](#student-management)
  - [Visit Records](#visit-records)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

---

## Features

| Feature | Description |
|---|---|
| **QR Code Scanner** | Instant student check-in/out via ID QR codes with camera selection support |
| **Real-time Dashboard** | Live overview of students in clinic, total visits today, and average visit duration |
| **Student Management** | Full student registry with bulk import from Excel (`.xlsx`) files |
| **Visit History** | Paginated and filterable records with search by grade level |
| **Data Export** | Export visit records to `.xlsx` with custom date range and grade level filters |
| **Database Backup** | One-click timestamped SQLite database backup |
| **Authentication** | JWT-based session management for authorized access only |
| **Dark Mode** | System-aware theme toggle with light and dark mode support |
| **Responsive Design** | Mobile-friendly layout with collapsible navigation |

---

## Tech Stack

<table>
  <tr>
    <td><b>Category</b></td>
    <td><b>Technology</b></td>
  </tr>
  <tr>
    <td>Framework</td>
    <td><a href="https://nextjs.org/">Next.js 16</a> (App Router)</td>
  </tr>
  <tr>
    <td>Language</td>
    <td><a href="https://www.typescriptlang.org/">TypeScript 5</a></td>
  </tr>
  <tr>
    <td>Styling</td>
    <td><a href="https://tailwindcss.com/">Tailwind CSS 4</a></td>
  </tr>
  <tr>
    <td>UI Components</td>
    <td><a href="https://ui.shadcn.com/">shadcn/ui</a></td>
  </tr>
  <tr>
    <td>Database ORM</td>
    <td><a href="https://www.prisma.io/">Prisma 7</a></td>
  </tr>
  <tr>
    <td>Database</td>
    <td><a href="https://www.sqlite.org/">SQLite</a></td>
  </tr>
  <tr>
    <td>Charts</td>
    <td><a href="https://recharts.org/">Recharts</a></td>
  </tr>
  <tr>
    <td>Authentication</td>
    <td>JWT (JSON Web Tokens)</td>
  </tr>
  <tr>
    <td>QR Scanning</td>
    <td><a href="https://github.com/nimiq/qr-scanner">qr-scanner</a></td>
  </tr>
</table>

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/altheopacheco/clinic-logbook-system.git
   cd clinic-logbook-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your settings:

   ```env
   # SQLite database file path (default works for local development)
   DATABASE_URL="file:./clinic.db"

   # System login credentials
   SYSTEM_USER="admin"
   SYSTEM_PASSWORD="your_secure_password"

   # JWT signing secret (use a long, random string)
   JWT_SECRET="your_jwt_secret_hash"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   
   npx prisma migrate deploy
   ```

5. **Build and start the application**

   ```bash
   npm run build
   npm run start
   ```

   The application will be available at **http://localhost:3000**.

> **Development mode:** Use `npm run dev` for hot-reload during development.

---

## Usage

### Logging In

Navigate to `/login` and enter the `SYSTEM_USER` and `SYSTEM_PASSWORD` credentials configured in your `.env` file. All other routes are protected and require authentication.

### Dashboard

The dashboard provides a real-time overview of clinic activity:

- **Total Visits Today** - Running count of all student visits for the day
- **Students In Clinic** - Number of students currently checked in
- **Avg Visit Duration** - Average time students spend in the clinic
- **Active Visits** - Live table of students currently in the clinic
- **Completed Visits** - Table of today's completed visits with time-in, time-out, and duration

### QR Code Scanner

1. Navigate to `/scanner`
2. Grant camera permissions when prompted
3. Select your preferred camera from the dropdown
4. Scan a student's ID QR code
5. The system automatically **logs in** students not currently in the clinic, or **logs out** students who are — a toast notification confirms each action

### Student Management

- **View students** at `/students`, filterable by grade level (Grades 7-12)
- **Import students** from an `.xlsx` file:
  - Click the **Import Students** button
  - The Excel file should have sheets named `G7`, `G8`, etc. for each grade level
  - Each sheet must contain `STUDENT NO.` and `NAME` columns
  - Existing records are updated (upsert); students not in the file are marked as alumni (Grade 13)

### Visit Records

- **Browse** all visit records at `/visits` with pagination and grade-level filtering
- **Export** records to `.xlsx` by selecting a date range and grade level
- **Backup** the entire SQLite database with a single click

---

## Project Structure

```
clinic-logbook-system/
├── app/
│   ├── dashboard/        # Dashboard page with stats cards, active & completed visits
│   ├── login/            # Authentication page
│   ├── scanner/          # QR code scanner with camera selection
│   ├── students/         # Student management with import & grade-level tabs
│   ├── visits/           # Visit records with export & backup functionality
│   ├── layout.tsx        # Root layout with navbar, theme provider, toaster
│   └── globals.css       # Global styles and CSS variables
├── components/
│   ├── ui/               # shadcn/ui component library
│   ├── navbar.tsx         # Responsive navigation bar with auth-aware links
│   ├── mode-toggle.tsx    # Light/dark mode toggle
│   └── theme-provider.tsx # next-themes provider wrapper
├── lib/
│   ├── actions/          # Server actions (auth, db, students, visits)
│   ├── prisma.ts         # Prisma client singleton
│   ├── session.ts        # JWT session management
│   └── utils.ts          # Shared utility functions
├── prisma/
│   ├── schema.prisma     # Database schema (Student, Visit models)
│   └── migrations/       # Database migration history
├── public/               # Static assets (logos, audio)
└── package.json
```

---

## Database Schema

The application uses a simple two-model schema:

```
┌─────────────────┐       ┌─────────────────────┐
│     Student     │       │        Visit         │
├─────────────────┤       ├─────────────────────┤
│ id         INT  │◄──┐   │ id        INT (auto) │
│ name       TEXT │   │   │ timeIn    DATETIME   │
│ gradeLevel INT  │   │   │ timeOut   DATETIME?  │
└─────────────────┘   └───│ studentId INT (FK)   │
                          └─────────────────────┘
```

- **Student**: Stores student ID numbers, names, and grade levels (7-12, 13 = Alumni)
- **Visit**: Records each clinic visit with check-in/out timestamps, linked to a student

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing conventions and passes linting (`npm run lint`).

---

<div align="center">
  <sub>Built for the <b>PSHS-IRC School Clinic</b></sub>
</div>
