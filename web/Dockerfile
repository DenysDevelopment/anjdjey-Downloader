# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY shared/package.json shared/
COPY server/package.json server/
COPY bot/package.json bot/
COPY web/package.json web/
RUN yarn install --frozen-lockfile

FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock tsconfig.base.json ./
COPY shared ./shared
COPY web ./web
RUN yarn workspace anjdjey-web build

FROM node:22-bookworm-slim AS runtime
RUN apt-get update \
 && apt-get install -y --no-install-recommends tini ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
    HOSTNAME=0.0.0.0

COPY --from=build /app/web/.next/standalone ./
COPY --from=build /app/web/.next/static ./web/.next/static

EXPOSE 3001
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "web/server.js"]
