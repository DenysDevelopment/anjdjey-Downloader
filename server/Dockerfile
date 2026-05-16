# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS deps
WORKDIR /app
ENV YOUTUBE_DL_SKIP_PYTHON_CHECK=1
COPY package.json yarn.lock ./
COPY shared/package.json shared/
COPY server/package.json server/
COPY bot/package.json bot/
COPY web/package.json web/
RUN yarn install --frozen-lockfile

FROM node:22-bookworm-slim AS app
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      python3 python3-pip ffmpeg ca-certificates curl tini \
 && pip3 install --no-cache-dir --break-system-packages yt-dlp \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production \
    PATH=/app/node_modules/.bin:${PATH} \
    UPLOAD_DIR=/data/downloads \
    YTDLP_COOKIES_DIR=/data/cookies

COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock tsconfig.base.json ./
COPY shared ./shared
COPY server ./server

RUN yarn workspace anjdjey-server prisma generate

VOLUME ["/data"]
EXPOSE 3000

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sh", "-c", "yarn workspace anjdjey-server prisma migrate deploy && tsx /app/server/src/index.ts"]
