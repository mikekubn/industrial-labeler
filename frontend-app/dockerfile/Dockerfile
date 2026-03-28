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

FROM base AS builder

ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BETTER_AUTH_BASE_PATH

LABEL build="${NEXT_PUBLIC_ENV}"

ENV NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV} \
    NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \
    NEXT_PUBLIC_BETTER_AUTH_BASE_PATH=${NEXT_PUBLIC_BETTER_AUTH_BASE_PATH}

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS runner

ARG BUILD_NUMBER
ARG ROOT_APP_SECRET

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    ROOT_APP_SECRET=${ROOT_APP_SECRET}

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN echo "${BUILD_NUMBER}" > /app/build_number && \
    cp /app/.next/BUILD_ID /app/BUILD_ID && \
    chown nextjs:nodejs /app/build_number /app/BUILD_ID

USER nextjs

EXPOSE 3000

CMD ["node", "--use-system-ca", "server.js"]