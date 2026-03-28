# Industrial Labeler

Full-stack application for industrial labeling workflows.

## Stack overview

| Layer | Technology | Role |
|--------|------------|------|
| **Frontend** | Web app | Admin center — configuration, oversight, and management UI |
| **Backend** | API + Prisma + PostgreSQL | Business logic, data access, and persistence |
| **Mobile** | Expo (React Native) | Field app; connects to **Zebra** printers for on-device label printing |

## Architecture (high level)

- **Admin frontend** talks to the **backend** over HTTPS (or your chosen API style).
- **Backend** owns validation, domain rules, and database access via **Prisma** against **PostgreSQL**.
- **Expo mobile** uses the same backend for sync/auth/jobs as needed, and integrates with Zebra printer SDKs or connectivity (Bluetooth/Wi‑Fi depending on printer model) for print jobs.

## Local development

_Add project-specific setup here once packages and scripts are defined (e.g. `pnpm install`, database URL, Prisma migrate, Expo start)._
