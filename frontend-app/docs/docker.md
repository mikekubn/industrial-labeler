# Docker

The production image is defined in [`dockerfile/Dockerfile`](../dockerfile/Dockerfile). It uses a multi-stage build (dependencies → Next.js build → standalone Node runner on port **3000**).

## Build

Run from the **repository root** so `COPY . .` includes the app and lockfile paths match the Dockerfile.

```bash
docker build \
  -f dockerfile/Dockerfile \
  --build-arg NEXT_PUBLIC_ENV=prod \
  --build-arg NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3000 \
  --build-arg NEXT_PUBLIC_BETTER_AUTH_BASE_PATH=/api/v1/auth \
  -t fe-labeler-app:latest \
  .
```

### Build arguments

| Argument | Stage | Required | Purpose |
|----------|--------|----------|---------|
| `NEXT_PUBLIC_ENV` | builder | Yes | Baked into the client bundle (e.g. `prod`, `staging`). |
| `NEXT_PUBLIC_API_BASE_URL` | builder | Yes | Public API / Better Auth base URL for the browser. |
| `NEXT_PUBLIC_BETTER_AUTH_BASE_PATH` | builder | Yes | Better Auth path segment (must match your API). |
| `BUILD_NUMBER` | runner | Optional | Written to `/app/build_number` in the image (defaults to empty if omitted). |
| `ROOT_APP_SECRET` | runner | Optional | Server-only secret; prefer **not** passing at build time for real secrets (see below). |

`NEXT_PUBLIC_*` values are fixed at **`next build`** time. Change them only by rebuilding the image.

## Run

Map host port **3001** and supply **runtime** configuration. Prefer injecting `ROOT_APP_SECRET` here instead of `--build-arg` so it does not sit in image layers or build logs.

```bash
docker run --rm -p 3001:3000 \
  -e ROOT_APP_SECRET=uF99lol6VKI5fnb6htERae34kzG1RRcm \
  fe-labeler-app:latest
```

If you already baked `ROOT_APP_SECRET` at build time with `--build-arg ROOT_APP_SECRET=...`, you can still override at run time with `-e ROOT_APP_SECRET=...`.

## Notes

- **Context**: Always build with `.` from the repo root; the Dockerfile expects `package.json`, `pnpm-lock.yaml`, and `.npmrc` at the context root.
- **Secrets**: Use your platform’s secret store or `docker run -e` / Compose `environment` for `ROOT_APP_SECRET` in production.
- **TLS / API URL**: Ensure `NEXT_PUBLIC_API_BASE_URL` points at the API the browser can reach from users’ networks (correct host, `https` where needed).
