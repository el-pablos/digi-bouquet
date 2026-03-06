import Redis from 'ioredis';

function createRedisClient(): Redis {
  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT || '6379', 10);
  const password = process.env.REDIS_PASSWORD;
  const username = process.env.REDIS_USERNAME || 'default';
  const db = parseInt(process.env.REDIS_DATABASE || '0', 10);

  if (!host || !password) {
    throw new Error('Redis credentials are not configured. Check REDIS_HOST and REDIS_PASSWORD env vars.');
  }

  return new Redis({
    host,
    port,
    username,
    password,
    db,
    maxRetriesPerRequest: 3,
    retryStrategy(times: number) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });
}

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = createRedisClient();
  }
  return redisClient;
}

export async function ping(): Promise<string> {
  const client = getRedisClient();
  return client.ping();
}

export async function getCache(key: string): Promise<string | null> {
  const client = getRedisClient();
  return client.get(key);
}

export async function setCache(key: string, value: string, ttl: number): Promise<void> {
  const client = getRedisClient();
  await client.setex(key, ttl, value);
}

export async function deleteCache(key: string): Promise<void> {
  const client = getRedisClient();
  await client.del(key);
}

export async function pushToList(key: string, value: string): Promise<void> {
  const client = getRedisClient();
  await client.lpush(key, value);
}

export async function getList(key: string, start = 0, stop = -1): Promise<string[]> {
  const client = getRedisClient();
  return client.lrange(key, start, stop);
}
