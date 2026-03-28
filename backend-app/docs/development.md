# Developer Documentation

This document outlines the development workflow for the Labeler backend application.

## Overview & Business Logic

The application is built using **NestJS** and integrates several core business modules:

-   **Material**: Manages material definitions.
-   **Quantity**: Handles quantity tracking for materials.
-   **Record**: Logs records of material usage or changes.
-   **Export**: Provides functionality to export data (likely Excel/CSV).
-   **Item**: General item management.

The system uses **Prisma** as an ORM to interact with a **PostgreSQL** database.

## Prerequisites

-   **Node.js**: (v18+ recommended)
-   **Yarn**: Package manager
-   **Docker**: For running the local database

## Local Development Setup

Follow these steps to get the application running on your local machine.

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd industrial-labeler/backend-app
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory. You can use the example below (adjust values as needed):

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5434/postgres?schema=app"
# Add other environment variables as required by the application
```
*Note: The local database port is set to `5434` in `docker-compose.yml` to avoid conflicts with default PostgreSQL installations.*

### 3. Database Setup

Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

### 4. Running the Application

Start the development server:

```bash
pnpm start:dev
```

The application will be available at `http://localhost:3000/api/v1`.

## Building for Production

To build the application for production:

```bash
pnpm build
```

The compiled output will be in the `dist/` directory.

To run the production build locally:

```bash
pnpm start:prod
```

## Deployment

The application is designed to be deployed on **Railway**.

### Steps to Deploy on Railway

1.  **Connect Repository**: Link your GitHub repository to a new project in Railway.
2.  **Environment Variables**: Configure the necessary environment variables in the Railway dashboard (e.g., `DATABASE_URL`, `PORT`, `BETTER_AUTH_SECRET`, etc.).
3.  **Build Command**: Railway should automatically detect the build command (`pnpm build`).
4.  **Start Command**: Railway should automatically detect the start command (`pnpm start:prod`).
5.  **Database**: You can provision a PostgreSQL database directly within Railway and link it via the `DATABASE_URL` variable.

## Authentication & Authorization

### Admin Role & Endpoints
Some specific endpoints, particularly internal administrative ones, require an `admin` role. These routes are protected with the `@Roles(['admin'])` decorator, as seen in `src/internal/internal.controller.ts`.

### Creating an Admin in Production
Creating an admin user in a production environment involves matching a specific UUID in the frontend application. Developers should consult and follow the frontend documentation for correctly configuring and bootstrapping admin accounts.

### Custom Password Reset Flow
The application implements a customized password reset mechanism configured in `src/utils/auth.ts`. Instead of directly sending emails via an SMTP connection, the system triggers a `user.password.reset` event using an event emitter. This event is handled by the internal service to make the token available. These tokens can be fetched using internal endpoints (e.g., in `src/internal/internal.controller.ts`), allowing the frontend to implement a custom workflow to handle the token.

## API Documentation

The application exposes API documentation via Swagger and Scalar.

-   **Swagger UI**: Visit `http://localhost:3000/api/v1/docs` to view the interactive API documentation.
-   **Scalar Reference**: Visit `http://localhost:3000/api/v1/reference` for the Scalar API reference.
-   **OpenAPI JSON**: The raw OpenAPI specification is available at `http://localhost:3000/api/v1/openapi.json`.
