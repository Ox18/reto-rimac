import { dynamoDB } from "../../infra/db/connection/DbConnection";

const CACHE_TABLE = process.env.DYNAMODB_CACHE_TABLE || "CacheTable";

export class Cache {
  private expirationTime: number = 30 * 60;
  private table: string = CACHE_TABLE;

  constructor(expirationTime: number = 30 * 60) {
    this.expirationTime = expirationTime;
  }

  async setCache<T>(key: string, data: T) {
    const params = {
      TableName: this.table,
      Item: {
        cacheKey: key,
        data: data,
        ttl: Math.floor(Date.now() / 1000) + this.expirationTime,
      },
    };

    await dynamoDB.put(params).promise();
  }

  async getCache<T>(key: string): Promise<T | null> {
    const params = {
      TableName: this.table,
      Key: { cacheKey: key },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item ? (result.Item.data as T) : null;
  }
}
