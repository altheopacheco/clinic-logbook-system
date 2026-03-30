# Clinic Logbook System

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/altheopacheco/clinic-logbook-system)

A modern, web-based logbook application designed to streamline the process of tracking student visits to a school clinic. Built with Next.js and Prisma, it features QR code scanning for efficient check-ins/outs, a real-time dashboard for monitoring, and comprehensive data management tools.

## Features

- **QR Code Scanner**: Enables quick and error-free logging of student entries and exits using their ID QR codes.
- **Real-time Dashboard**: An at-a-glance view of current clinic activity, including a list of students currently inside, total visits for the day, and average visit duration.
- **Student Management**: Easily manage student records. Includes a feature to import student lists directly from an Excel (`.xlsx`) file.
- **Comprehensive Visit History**: A paginated and filterable table of all visit records. Search by grade level and view details like time-in, time-out, and visit duration.
- **Data Export**: Export visit records for a selected date range and grade level into an `.xlsx` file for reporting and analysis.
- **Database Backup**: Create a timestamped backup of the entire SQLite database with a single click.
- **Secure Authentication**: Protected by a JWT-based session system to ensure only authorized personnel can access the system.
- **Responsive Design & Dark Mode**: A clean, modern UI that works on various devices and supports both light and dark themes.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [SQLite](https://www.sqlite.org/index.html)
- **Authentication**: JWT (JSON Web Tokens)
- **QR Scanning**: [qr-scanner](https://github.com/nimiq/qr-scanner)

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and npm (or a compatible package manager) installed on your system.

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/altheopacheco/clinic-logbook-system.git
    cd clinic-logbook-system
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root of the project by copying the example file.

    ```sh
    cp .env.example .env
    ```

    Now, open `.env` and fill in the required values:

    ```env
    # The default path for the SQLite database file. No changes needed for local setup.
    DATABASE_URL="file:./clinic.db"

    # Set the credentials for logging into the system.
    SYSTEM_USER="admin"
    SYSTEM_PASSWORD="your_secure_password"

    # A secret key for signing JWTs. Generate a long, random string for this.
    JWT_SECRET="your_jwt_secret_hash"
    ```

4.  **Set up the database**
    Run the Prisma migration command to set up your SQLite database schema. This will create the `clinic.db` file and the necessary tables.

    ```sh
    npx prisma migrate deploy
    ```

5.  **Run the development server**
    ```sh
    npm run build
    npm run start
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

### Logging In

Navigate to [http://localhost:3000/login](http://localhost:3000/login) and use the `SYSTEM_USER` and `SYSTEM_PASSWORD` credentials you defined in your `.env` file.

### Importing Students

The system can import student data from an `.xlsx` file.

1.  Navigate to the `/students` page.
2.  Click the `Import Students` button.
3.  Select your Excel file. The file should have separate sheets for each grade level, named `G7`, `G8`, etc.
4.  Each sheet must contain columns named `STUDENT NO.` and `NAME`.

The system will upsert the student records, updating existing ones and adding new ones. Students from the file are marked as active; any students already in the database but not in the new file will have their grade level updated to `13` (Alumni).

### Scanning QR Codes

1.  Navigate to the `/scanner` page.
2.  Grant camera permissions when prompted.
3.  Scan a QR code. The data in the QR code should be the student's ID number.
4.  The system will automatically log the student in if they are not currently in the clinic, or log them out if they are. A toast notification will confirm the action.
