import {
  TAU,
  sum,
  maxIndex,
  groupBy,
  reduceMinBy,
  reduceMaxBy,
  combine,
  permute,
  gcd2,
  lcm2,
  gcd,
  lcm,
} from '../../utils';

describe('math utilities', () => {
  describe('TAU', () => {
    it('equals 2π', () => {
      expect(TAU).toEqual(2 * Math.PI);
    });
  });

  describe('sum()', () => {
    it('sums up array contents', () => {
      expect(sum([1, 2, 3])).toEqual(6);
    });
  });

  describe('maxIndex()', () => {
    it('returns index of highest value in given array', () => {
      expect(maxIndex([1, 100, 5, 99])).toEqual(1);
    });
  });

  describe('groupBy()', () => {
    it('groups values in given array by given prop', () => {
      const bob = { age: 10 };
      const pete = { age: 10 };
      const sara = { age: 25 };
      const people = [bob, pete, sara];
      const grouped = groupBy(people, 'age');
      expect(Array.from(grouped.entries())).toEqual([
        [10, [bob, pete]],
        [25, [sara]],
      ]);
    });
  });

  describe('reduceMinBy()', () => {
    it('returns candidate with minimum value for given prop', () => {
      const sara = { age: 25 };
      const pete = { age: 10 };
      const bob = { age: 10 };
      const people = [sara, pete, bob];
      expect(reduceMinBy(people, 'age')).toBe(pete);
    });

    it('returns only candidate when given an array of size one', () => {
      const value = Symbol();
      expect(reduceMinBy([value])).toBe(value);
    });
  });

  describe('reduceMaxBy()', () => {
    it('returns candidate with minimum value for given prop', () => {
      const pete = { age: 10 };
      const sara = { age: 25 };
      const bob = { age: 10 };
      const people = [pete, sara, bob];
      expect(reduceMaxBy(people, 'age')).toBe(sara);
    });

    it('returns only candidate when given an array of size one', () => {
      const value = Symbol();
      expect(reduceMaxBy([value])).toBe(value);
    });
  });

  describe('combine()', () => {
    const values = [1, 2, 3];

    it('generates all combinations in given array', () => {
      const combinations = Array.from(combine(values));
      expect(combinations).toEqual([
        [1], [2], [3],
        [1, 2], [1, 3], [2, 3],
        [1, 2, 3],
      ]);
    });

    it('supports k = 0', () => {
      const combinations = Array.from(combine(values, { k: 0 }));
      expect(combinations).toEqual([]);
    });

    it('supports k = 1', () => {
      const combinations = Array.from(combine(values, { k: 1 }));
      expect(combinations).toEqual([[1], [2], [3]]);
    });

    it('supports k = ?', () => {
      const combinations = Array.from(combine(values, { k: 2 }));
      expect(combinations).toEqual([[1, 2], [1, 3], [2, 3]]);
    });

    it('supports k = n', () => {
      const combinations = Array.from(combine(values, { k: 3 }));
      expect(combinations).toEqual([[1, 2, 3]]);
    });

    it('returns a generator, postponing actual combining until used', () => {
      const generator = combine(new Array(2 ** 32 - 1));
      expect(generator.next).toBeDefined();
    });
  });

  describe('permute()', () => {
    const values = [1, 2, 3];

    it('generates all combinations in given array', () => {
      const permutations = Array.from(permute(values));
      expect(permutations).toEqual([
        [1, 2, 3], [2, 1, 3], [3, 1, 2],
        [1, 3, 2], [2, 3, 1], [3, 2, 1],
      ]);
    });

    it('returns a generator, postponing actual permutation until used', () => {
      const generator = permute(new Array(2 ** 32 - 1));
      expect(generator.next).toBeDefined();
    });
  });

  describe('gcd2()', () => {
    it('returns greatest common divisor of given two integers', () => {
      expect(gcd2(8, 12)).toEqual(4);
      expect(gcd2(54, 24)).toEqual(6);
      expect(gcd2(4)).toBeNaN();
    });
  });

  describe('lcm2()', () => {
    it('returns least common multiple of given two integers', () => {
      expect(lcm2(4, 6)).toEqual(12);
      expect(lcm2(21, 6)).toEqual(42);
    });
  });

  describe('gcd()', () => {
    it('returns greatest common divisor of all given integers', () => {
      expect(gcd2(4, 8, 12)).toEqual(4);
      expect(gcd([9, 12, 21])).toEqual(3);
    });
  });

  describe('lcm()', () => {
    it('returns least common multiple of all given integers', () => {
      expect(lcm([4, 6, 12])).toEqual(12);
      expect(lcm([8, 9, 21])).toEqual(504);
    });
  });
});