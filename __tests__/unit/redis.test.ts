import {
  getCache,
  setCache,
  deleteCache,
  pushToList,
  getList,
  ping,
} from '@/lib/redis';

// Mock ioredis
const mockPing = jest.fn().mockResolvedValue('PONG');
const mockGet = jest.fn();
const mockSetex = jest.fn().mockResolvedValue('OK');
const mockDel = jest.fn().mockResolvedValue(1);
const mockLpush = jest.fn().mockResolvedValue(1);
const mockLrange = jest.fn();

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    ping: mockPing,
    get: mockGet,
    setex: mockSetex,
    del: mockDel,
    lpush: mockLpush,
    lrange: mockLrange,
  }));
});

// Set env vars before importing
beforeAll(() => {
  process.env.REDIS_HOST = 'test-host';
  process.env.REDIS_PORT = '6379';
  process.env.REDIS_PASSWORD = 'test-password';
  process.env.REDIS_USERNAME = 'default';
  process.env.REDIS_DATABASE = '0';
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Redis helper functions', () => {
  describe('ping', () => {
    it('mengembalikan PONG saat redis terkoneksi', async () => {
      const result = await ping();
      expect(result).toBe('PONG');
      expect(mockPing).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCache', () => {
    it('mengembalikan data dari cache', async () => {
      mockGet.mockResolvedValue('{"test": true}');
      const result = await getCache('test-key');
      expect(result).toBe('{"test": true}');
      expect(mockGet).toHaveBeenCalledWith('test-key');
    });

    it('mengembalikan null jika cache kosong', async () => {
      mockGet.mockResolvedValue(null);
      const result = await getCache('missing-key');
      expect(result).toBeNull();
    });
  });

  describe('setCache', () => {
    it('menyimpan data dengan ttl', async () => {
      await setCache('test-key', 'test-value', 60);
      expect(mockSetex).toHaveBeenCalledWith('test-key', 60, 'test-value');
    });
  });

  describe('deleteCache', () => {
    it('menghapus key dari cache', async () => {
      await deleteCache('test-key');
      expect(mockDel).toHaveBeenCalledWith('test-key');
    });
  });

  describe('pushToList', () => {
    it('menambahkan item ke list', async () => {
      await pushToList('bouquets', '{"id": "123"}');
      expect(mockLpush).toHaveBeenCalledWith('bouquets', '{"id": "123"}');
    });
  });

  describe('getList', () => {
    it('mengambil semua item dari list', async () => {
      mockLrange.mockResolvedValue(['item1', 'item2']);
      const result = await getList('bouquets');
      expect(result).toEqual(['item1', 'item2']);
      expect(mockLrange).toHaveBeenCalledWith('bouquets', 0, -1);
    });

    it('mengambil item dengan range tertentu', async () => {
      mockLrange.mockResolvedValue(['item1']);
      const result = await getList('bouquets', 0, 5);
      expect(result).toEqual(['item1']);
      expect(mockLrange).toHaveBeenCalledWith('bouquets', 0, 5);
    });
  });
});
