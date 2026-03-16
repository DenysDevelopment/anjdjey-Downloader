import fs from 'fs';
import path from 'path';
import { env } from '../../config/env';
import type { IStorage } from './storage.interface';

class LocalStorage implements IStorage {
  private baseDir: string;

  constructor() {
    this.baseDir = path.resolve(env.UPLOAD_DIR);
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  getPath(fileId: string, ext: string): string {
    return path.join(this.baseDir, `${fileId}.${ext}`);
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async delete(filePath: string): Promise<void> {
    try {
      await fs.promises.unlink(filePath);
    } catch {
      // Файл уже удалён
    }
  }

  getStream(filePath: string): NodeJS.ReadableStream {
    return fs.createReadStream(filePath);
  }
}

export const storage = new LocalStorage();
