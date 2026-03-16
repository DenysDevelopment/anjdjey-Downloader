import { prisma } from '../../config/database';
import { logger } from '../../utils/logger';

class ProxyManager {
  async getNext(): Promise<{ url: string } | null> {
    const proxies = await prisma.proxyConfig.findMany({
      where: { isActive: true, failCount: { lt: 5 } },
      orderBy: { lastUsedAt: 'asc' },
      take: 1,
    });

    if (proxies.length === 0) return null;

    const proxy = proxies[0];
    await prisma.proxyConfig.update({
      where: { id: proxy.id },
      data: { lastUsedAt: new Date() },
    });

    return { url: proxy.url };
  }

  async reportFailure(proxyUrl: string): Promise<void> {
    await prisma.proxyConfig.updateMany({
      where: { url: proxyUrl },
      data: { failCount: { increment: 1 }, lastFailAt: new Date() },
    });
    logger.warn({ proxyUrl }, 'Прокси: ошибка');
  }

  async reportSuccess(proxyUrl: string): Promise<void> {
    await prisma.proxyConfig.updateMany({
      where: { url: proxyUrl },
      data: { failCount: 0 },
    });
  }
}

export const proxyManager = new ProxyManager();
