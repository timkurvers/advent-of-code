import { Cache } from '../../../utils';

describe('Cache', () => {
  describe('constructor', () => {
    it('creates a cache, backed by a map with a default create function', () => {
      const cache = new Cache();
      expect(cache).toBeInstanceOf(Map);
      expect(cache.create).toBeInstanceOf(Function);
    });

    it('supports a custom create function', () => {
      const create = () => {};
      const cache = new Cache(create);
      expect(cache).toBeInstanceOf(Map);
      expect(cache.create).toBe(create);
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

    it('uses the custom create function configured for this cache', () => {
      const cache = new Cache((key) => ({ key }));
      const entry = cache.lookup('foo');
      expect(entry).toEqual({ key: 'foo' });
    });

    it('supports a custom create function', () => {
      const cache = new Cache();
      const entry = cache.lookup('baz', (key) => ({ key }));
      expect(entry).toEqual({ key: 'baz' });
    });
  });
});
