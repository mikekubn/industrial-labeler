# Docker build and run

## Prerequisites

- Docker Engine and Docker Compose (v2: `docker compose`)
- A `.env` file in the project root (see [Environment](#environment))

## Environment

Create `.env` from `.example.env` and set at least:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string. **Required for the image build** (Prisma generate runs during `docker build`). |
| `BETTER_AUTH_SECRET` | Secret for Better Auth. |
| `BETTER_AUTH_URL` | Public base URL of the app (e.g. `http://localhost:3000` when testing locally). |
| `BETTER_AUTH_DISABLE_SIGNUP` | Optional; e.g. `false`. |

**Database URL when using Compose:** the `app` service must reach Postgres by the service name `postgres` on port `5432` (not `localhost` or the host-mapped port). Example:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres?schema=app
```

For tools on your host (migrations, Prisma Studio), use the published port `5434` and `127.0.0.1` instead of `postgres`.

## Build the image

The Dockerfile is multi-stage: installs dependencies with pnpm, runs `prisma generate` and `pnpm build` in the builder stage, then copies `dist`, production `node_modules`, and generated Prisma client into a small runtime image. The build expects `DATABASE_URL` as a build argument (Compose passes it from `.env`).

**Build only (from repo root):**

```bash
docker build -f dockerfile/Dockerfile \
  --build-arg DATABASE_URL="$DATABASE_URL" \
  -t be-labeler-app:latest .
```

Replace `DATABASE_URL` with a valid connection string if it is not already in your shell environment.

## Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

- **Builds** the `app` image using `dockerfile/Dockerfile` and injects `DATABASE_URL` from `.env`.
- Starts **Postgres 17** (`postgres`) with data in a named volume, schema `app`, host port **5434** → container `5432`.
- Starts **app** on **3000** and passes auth/database env vars from `.env`.

Detached run:

```bash
docker compose up -d --build
```

Stop and remove containers (keeps the `postgres` volume):

```bash
docker compose down
```

## Quick reference

| Service | Host port | Notes |
|---------|-----------|--------|
| `app` | `3000` | Nest/API |
| `postgres` | `5434` | Same DB as in-container URL uses port `5432` |

Ensure `DATABASE_URL` in `.env` matches the Compose network (`postgres:5432`) before building or the Prisma step may fail or point at the wrong host.
