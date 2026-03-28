# syntax=docker.io/docker/dockerfile:1

FROM node:22.22-alpine3.22 AS base

LABEL maintainer="Labeler App"

RUN npm install -g corepack@latest && corepack enable

WORKDIR /app

FROM base AS dependencies
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
ENV HUSKY=0
RUN pnpm install --frozen-lockfile

FROM base AS prod-deps
RUN apk add --no-cache libc6-compat openssl

COPY package.json pnpm-lock.yaml ./
ENV HUSKY=0
RUN pnpm install --frozen-lockfile --prod
RUN pnpm add -D prisma

FROM base AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate && pnpm build

FROM base AS runner

ARG BUILD_NUMBER

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0

RUN apk add --no-cache libc6-compat openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated/prisma ./generated/prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./package.json

# node_modules are owned by root from COPY; Prisma CLI must write under @prisma/engines at runtime.
RUN chown -R app:nodejs /app

USER app

EXPOSE 3000

CMD ["pnpm", "run", "prod"]