# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the repo root unless noted. The repo is a Yarn workspaces monorepo (`shared`, `server`, `bot`, `web`).

```bash
# Infrastructure (Postgres + Redis via docker compose)
yarn docker:up                    # start Postgres on :5434, Redis on :6379
yarn docker:down

# Database (Prisma, scoped to the server workspace)
yarn db:migrate                   # prisma migrate dev — apply/create migrations
yarn db:generate                  # regenerate Prisma client (run after schema.prisma edits)
yarn db:seed                      # tsx src/prisma/seed.ts — seeds BlockedUrl + ProxyConfig
yarn db:studio

# Dev servers (each in its own terminal)
yarn dev:server                   # Express API on :3000 — also hosts the BullMQ worker + cleanup cron
yarn dev:bot                      # grammy Telegram bot (polling by default)
yarn dev:web                      # Next.js on :3001

# Production builds
yarn build:server && yarn build:bot && yarn build:web

# Tests (server only)
yarn test                         # vitest run
yarn workspace anjdjey-server test:watch
yarn workspace anjdjey-server test -- path/to/file.test.ts    # run a single test file
# Test files live at server/src/__tests__/**/*.test.ts — none committed yet.

# yt-dlp binary (required by the server worker)
bash scripts/setup-yt-dlp.sh      # installs/updates via brew or pip3
```

There is no top-level lint script. The web workspace uses `next build` for type-checking; server/bot use `tsc`.

**Port gotcha:** `.env.example` says Postgres on `5433`, but `docker-compose.yml` maps to `5434`. The committed `.env` correctly uses `5434` — match that.

## Architecture

Four workspaces share types through `shared/`. The path alias `@shared/*` (mapped to `../shared/*` in each tsconfig) is used by `server`, `bot`, and `web` to import enums, DTOs, and the platform detector.

### Request flow (web)

1. Browser → `useDownload` hook (`web/src/hooks/useDownload.ts`) → `web/src/lib/api.ts` → **directly** hits `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`).
2. A thin Next.js proxy exists at `web/src/app/api/download/route.ts` but is **not** used by `useDownload` — it's a fallback for server-side calls. Both paths forward the same shape.
3. The hook polls `GET /api/download/:jobId` every 2s until `COMPLETED` or `FAILED`, then builds a file URL via `getFileUrl(fileId)` pointing at `GET /api/files/:fileId` on the server.

### Request flow (bot)

`bot/` is a separate process using `grammy`. It only handles **private chats** (`bot.chatType('private')`). On a text message it calls `apiClient.submitDownload(..., source: 'TELEGRAM')` against the server, polls status, then `file-sender.ts` streams the file back through Telegram — **with a hard 50 MB cap** (`TELEGRAM_FILE_SIZE_LIMIT`); larger files are replied to as a download URL instead.

`BOT_MODE` switches between `polling` (default) and `webhook`. There is a `setupBotWebhook(app)` helper but `server/src/index.ts` does **not** mount it — webhook mode currently only works if you wire it in yourself.

### Server layering (`server/src/`)

Clean-architecture layout, dependencies point inward:

- `api/` — Express routers (`download`, `metadata`, `files`, `stats`), `validate` middleware (zod), `errorHandler` that translates `AppError` → HTTP.
- `application/use-cases/` — orchestration (`submit-download`, `get-download-status`, `get-download-file`, `extract-metadata`). Use cases are the entry point from the API layer.
- `application/services/cleanup.service.ts` — `setInterval` cron started at boot (`CLEANUP_INTERVAL_MINUTES`).
- `domain/validators/schemas.ts` — zod schemas shared across routes.
- `infrastructure/`
  - `queue/` — BullMQ `Queue` + `Worker` for `video-download`. **The worker runs in-process** with the API (`startDownloadWorker()` in `index.ts`). `WORKER_CONCURRENCY = 5`, `JOB_ATTEMPTS = 3` exponential backoff.
  - `downloader/yt-dlp.service.ts` — wraps `youtube-dl-exec`. Rotates user agents (`getRandomUserAgent`), optionally takes a proxy.
  - `downloader/proxy-manager.ts` — picks proxies from the `ProxyConfig` table by `lastUsedAt`, disables after 5 failures.
  - `storage/local-storage.ts` — writes to `UPLOAD_DIR` (default `./downloads`). Files keyed by UUID `fileId`, not original name.
  - `repositories/download.repository.ts` — all Prisma access for `Download` goes through this; use cases never touch `prisma.download` directly.

### Key cross-cutting behaviors

- **Recent-download cache:** `submitDownload` calls `findRecentByUrl(url, quality)` and returns the existing `COMPLETED` record (`fromCache: true`) instead of enqueueing a new job if one is still within its TTL. Same `originalUrl` + `quality` → same `fileId`.
- **Metadata cache:** `extractMetadataUseCase` caches yt-dlp output in Redis under `metadata:<sha256(url)>` for 1 hour (`METADATA_CACHE_TTL`). The download worker does **not** consult this cache — it re-extracts before downloading.
- **File TTL:** `FILE_TTL_HOURS` (default 2). `expiresAt` is set on the `Download` row at completion; `cleanupExpiredFiles` deletes the file from disk and flips status to `EXPIRED`. `getDownloadFile` returns 410 for expired/missing files.
- **BigInt JSON:** `server/src/index.ts` patches `BigInt.prototype.toJSON` so Telegram user/chat IDs (`BigInt` in Prisma) serialize cleanly in API responses. Don't remove this.
- **Rate limits** are mounted per-path in `index.ts` (`/api/download` strict, `/api/metadata` 2×).

### Shared types vs. Prisma enums

`shared/types/` defines `Platform`, `DownloadStatus`, `VideoQuality`, etc. as **TypeScript const objects** (not `enum`) so they're tree-shakeable and identical at runtime. The same enums exist in `prisma/schema.prisma`. **When adding a value, update both.** Cast at the boundary (`as never` is used in a few places — e.g. `downloadRepository.findRecentByUrl`).

`shared/utils/platform-detector.ts` is a regex-based URL → `Platform` mapper. Add new platforms here, in `schema.prisma`, and in `shared/types/platform.ts` together.

### Web specifics

- Next.js 15 App Router, `output: 'standalone'`, React 19, Tailwind v4 (`@tailwindcss/postcss`).
- SEO landing pages live in `web/src/lib/seo-pages.ts` as a static array, rendered by `web/src/app/[slug]/page.tsx` via `generateStaticParams` + JSON-LD. To add a landing page, append to the array — no route changes needed.
- `web/src/app/page.tsx` and `[slug]` are client components that drive `useDownload`.

### Localization

All user-facing strings (API error messages, logs, bot replies, web UI) are in **Russian**. Match the existing tone when editing.
