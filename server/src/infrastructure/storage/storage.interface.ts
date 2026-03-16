export interface IStorage {
  getPath(fileId: string, ext: string): string;
  exists(filePath: string): Promise<boolean>;
  delete(filePath: string): Promise<void>;
  getStream(filePath: string): NodeJS.ReadableStream;
}
