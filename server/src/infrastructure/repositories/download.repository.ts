import { prisma } from '../../config/database';
import type { Prisma } from '@prisma/client';

export const downloadRepository = {
  async create(data: Prisma.DownloadCreateInput) {
    return prisma.download.create({ data });
  },

  async findById(id: string) {
    return prisma.download.findUnique({ where: { id } });
  },

  async findByFileId(fileId: string) {
    return prisma.download.findUnique({ where: { fileId } });
  },

  async findRecentByUrl(url: string, quality: string) {
    return prisma.download.findFirst({
      where: {
        originalUrl: url,
        quality: quality as never,
        status: 'COMPLETED',
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async update(id: string, data: Prisma.DownloadUpdateInput) {
    return prisma.download.update({ where: { id }, data });
  },

  async findExpired(limit: number = 100) {
    return prisma.download.findMany({
      where: {
        expiresAt: { lte: new Date() },
        filePath: { not: null },
        status: { not: 'EXPIRED' },
      },
      take: limit,
    });
  },

  async getTodayStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [total, completed] = await Promise.all([
      prisma.download.count({ where: { createdAt: { gte: today } } }),
      prisma.download.count({
        where: { createdAt: { gte: today }, status: 'COMPLETED' },
      }),
    ]);

    return { totalToday: total, completedToday: completed };
  },

  async getTotalStats() {
    const [total, completed] = await Promise.all([
      prisma.download.count(),
      prisma.download.count({ where: { status: 'COMPLETED' } }),
    ]);

    return { total, completed };
  },
};
