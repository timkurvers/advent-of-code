import {
  cast,
  clone,
  identity,
  isNumber,
  isPrimitive,
  noop,
} from '../../src/utils';

describe('type utilities', () => {
  describe('cast()', () => {
    it('returns number if given string can be cast to an integer', () => {
      expect(cast('10')).toEqual(10);
      expect(cast('-322')).toEqual(-322);
    });

    it('returns given string if cannot be cast to an integer', () => {
      expect(cast('foobar')).toEqual('foobar');
    });
  });

  describe('clone()', () => {
    it('clones given object', () => {
      const bob = { name: 'Bob' };
      const bobby = clone(bob);
      bobby.name = 'Bobby';
      expect(bobby).not.toBe(bob);
      expect(bobby.name).toEqual('Bobby');
      expect(bob.name).toEqual('Bob');
    });

    it('does not support objects with circular references', () => {
      const obj = {};
      obj.self = obj;
      expect(() => {
        clone(obj);
      }).toThrow();
    });
  });

  describe('identity()', () => {
    it('returns given value', () => {
      const value = Symbol();
      expect(identity(value)).toBe(value);
    });
  });

  describe('isNumber()', () => {
    it('returns true for numbers', () => {
      expect(isNumber(10)).toBe(true);
      expect(isNumber(10.1)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
    });

    it('returns false for non-numbers', () => {
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber(false)).toBe(false);
      expect(isNumber('string')).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber(() => {})).toBe(false);
    });
  });

  describe('isPrimitive()', () => {
    it('returns true for primitives', () => {
      expect(isPrimitive(undefined)).toBe(true);
      expect(isPrimitive(true)).toBe(true);
      expect(isPrimitive(false)).toBe(true);
      expect(isPrimitive(10)).toBe(true);
      expect(isPrimitive('string')).toBe(true);
      expect(isPrimitive(null)).toBe(true);
    });

    it('returns false for non-primitives', () => {
      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive(() => {})).toBe(false);
    });
  });

  describe('noop()', () => {
    it('does nothing', () => {
      expect(noop()).toBeUndefined();
    });
  });
});
