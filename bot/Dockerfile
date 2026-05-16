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
 && apt-get install -y --no-install-recommends ca-certificates tini \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production \
    PATH=/app/node_modules/.bin:${PATH}

COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock tsconfig.base.json ./
COPY shared ./shared
COPY bot ./bot

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["tsx", "/app/bot/src/index.ts"]
