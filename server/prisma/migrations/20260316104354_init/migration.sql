-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('TIKTOK', 'YOUTUBE', 'INSTAGRAM', 'FACEBOOK', 'TWITTER', 'PINTEREST', 'REDDIT', 'VIMEO', 'LIKEE', 'THREADS', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "DownloadStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DownloadSource" AS ENUM ('WEB', 'TELEGRAM', 'API');

-- CreateEnum
CREATE TYPE "VideoQuality" AS ENUM ('BEST', 'HD_1080', 'HD_720', 'SD_480', 'SD_360', 'AUDIO_ONLY');

-- CreateTable
CREATE TABLE "Download" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "source" "DownloadSource" NOT NULL,
    "status" "DownloadStatus" NOT NULL DEFAULT 'QUEUED',
    "quality" "VideoQuality" NOT NULL DEFAULT 'BEST',
    "title" TEXT,
    "description" TEXT,
    "duration" INTEGER,
    "thumbnailUrl" TEXT,
    "originalAuthor" TEXT,
    "viewCount" INTEGER,
    "likeCount" INTEGER,
    "resolution" TEXT,
    "fileId" TEXT,
    "fileName" TEXT,
    "filePath" TEXT,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "downloadUrl" TEXT,
    "jobId" TEXT,
    "processingTime" INTEGER,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "telegramUserId" BIGINT,
    "telegramChatId" BIGINT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "countryCode" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStats" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalDownloads" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "uniqueUsers" INTEGER NOT NULL DEFAULT 0,
    "totalFileSize" BIGINT NOT NULL DEFAULT 0,
    "platformStats" JSONB NOT NULL DEFAULT '{}',
    "sourceStats" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CachedMetadata" (
    "id" TEXT NOT NULL,
    "urlHash" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "metadata" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CachedMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedUrl" (
    "id" TEXT NOT NULL,
    "urlPattern" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockedUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProxyConfig" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "lastFailAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProxyConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Download_fileId_key" ON "Download"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Download_jobId_key" ON "Download"("jobId");

-- CreateIndex
CREATE INDEX "Download_status_idx" ON "Download"("status");

-- CreateIndex
CREATE INDEX "Download_platform_idx" ON "Download"("platform");

-- CreateIndex
CREATE INDEX "Download_jobId_idx" ON "Download"("jobId");

-- CreateIndex
CREATE INDEX "Download_fileId_idx" ON "Download"("fileId");

-- CreateIndex
CREATE INDEX "Download_telegramUserId_idx" ON "Download"("telegramUserId");

-- CreateIndex
CREATE INDEX "Download_createdAt_idx" ON "Download"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Download_status_createdAt_idx" ON "Download"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Download_expiresAt_idx" ON "Download"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStats_date_key" ON "DailyStats"("date");

-- CreateIndex
CREATE INDEX "DailyStats_date_idx" ON "DailyStats"("date" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "CachedMetadata_urlHash_key" ON "CachedMetadata"("urlHash");

-- CreateIndex
CREATE INDEX "CachedMetadata_urlHash_idx" ON "CachedMetadata"("urlHash");

-- CreateIndex
CREATE INDEX "CachedMetadata_expiresAt_idx" ON "CachedMetadata"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedUrl_urlPattern_key" ON "BlockedUrl"("urlPattern");

-- CreateIndex
CREATE INDEX "BlockedUrl_urlPattern_idx" ON "BlockedUrl"("urlPattern");

-- CreateIndex
CREATE INDEX "ProxyConfig_isActive_failCount_idx" ON "ProxyConfig"("isActive", "failCount");
