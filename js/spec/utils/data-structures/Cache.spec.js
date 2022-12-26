import { Cache } from '../../../src/utils';

describe('Cache', () => {
  describe('constructor', () => {
    it('creates a cache, backed by a map with a default init and hash function', () => {
      const cache = new Cache();
      expect(cache).toBeInstanceOf(Map);
      expect(cache.init).toBeInstanceOf(Function);
      expect(cache.hash).toBeInstanceOf(Function);
    });

    it('supports a custom create function', () => {
      const init = () => {};
      const cache = new Cache({ init });
      expect(cache).toBeInstanceOf(Map);
      expect(cache.init).toBe(init);
    });

    it('supports a custom hash function', () => {
      const hash = () => {};
      const cache = new Cache({ hash });
      expect(cache).toBeInstanceOf(Map);
      expect(cache.hash).toBe(hash);
    });
  });

  describe('lookup()', () => {
    it('creates entry for key when given key is not yet present in cache', () => {
      const cache = new Cache();
      const entry = cache.lookup('foo');
      expect(entry).toEqual('foo');
    });

    it('returns existing entry when given key is present in cache', () => {
      const cache = new Cache();
      const entry = cache.lookup('bar');
      expect(cache.lookup('bar')).toBe(entry);
    });

    it('uses the custom init function configured for this cache', () => {
      const cache = new Cache({ init: (key) => ({ key }) });
      const entry = cache.lookup('foo');
      expect(entry).toEqual({ key: 'foo' });
    });

    it('uses the custom hash function configured for this cache', () => {
      const cache = new Cache({
        init: (key, hash) => ({ key, hash }),
        hash: (key) => key.join(','),
      });
      const entry = cache.lookup([0, 1, 2]);
      expect(entry).toEqual({
        key: [0, 1, 2],
        hash: '0,1,2',
      });
    });
  });
});
