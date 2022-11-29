import {
  TAU,
  bitsNeededFor,
  multiply,
  sum,
  maxIndex,
  groupBy,
  reduceMinBy,
  reduceMaxBy,
  combine,
  permute,
  dfor,
  mod,
  modMulInv,
  modPow,
  gcd2,
  lcm2,
  gcd,
  lcm,
} from '../../src/utils';

describe('math utilities', () => {
  describe('TAU', () => {
    it('equals 2π', () => {
      expect(TAU).toEqual(2 * Math.PI);
    });
  });

  describe('bitsNeededFor()', () => {
    it('calculates bits needed to represent given number', () => {
      expect(bitsNeededFor(0)).toEqual(0);
      expect(bitsNeededFor(1)).toEqual(1);
      expect(bitsNeededFor(2)).toEqual(2);
      expect(bitsNeededFor(3)).toEqual(2);
      expect(bitsNeededFor(4)).toEqual(3);
      expect(bitsNeededFor(126)).toEqual(7);
      expect(bitsNeededFor(127)).toEqual(7);
      expect(bitsNeededFor(128)).toEqual(8);
    });
  });

  describe('multiply()', () => {
    it('multiplies array contents', () => {
      expect(multiply([3, 4, 5])).toEqual(60);
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

  describe('dfor()', () => {
    it('generates all dynamic for-loop iterations for given boundaries', () => {
      const iterations3d = Array.from(dfor([
        { min: 0, max: 1 },
        { min: 1, max: 3 },
        { min: 0, max: 1 },
      ]));
      expect(iterations3d).toEqual([
        [0, 1, 0], [0, 1, 1], [0, 2, 0], [0, 2, 1],
        [0, 3, 0], [0, 3, 1], [1, 1, 0], [1, 1, 1],
        [1, 2, 0], [1, 2, 1], [1, 3, 0], [1, 3, 1],
      ]);

      const iterations4d = Array.from(dfor([
        { min: 0, max: 1 },
        { min: 1, max: 3 },
        { min: 1, max: 1 },
        { min: 0, max: 1 },
      ]));
      expect(iterations4d).toEqual([
        [0, 1, 1, 0], [0, 1, 1, 1], [0, 2, 1, 0], [0, 2, 1, 1],
        [0, 3, 1, 0], [0, 3, 1, 1], [1, 1, 1, 0], [1, 1, 1, 1],
        [1, 2, 1, 0], [1, 2, 1, 1], [1, 3, 1, 0], [1, 3, 1, 1],
      ]);
    });
  });

  describe('mod()', () => {
    it('mathematical modulo operator (as opposed to remainder)', () => {
      expect(mod(19, 12)).toEqual(7);
      expect(mod(19, -12)).toEqual(-5);
      expect(mod(-19, 12)).toEqual(5);
      expect(mod(-19, -12)).toEqual(-7);
    });

    it('supports BigInt', () => {
      expect(mod(19n, 12n)).toEqual(7n);
      expect(mod(19n, -12n)).toEqual(-5n);
      expect(mod(-19n, 12n)).toEqual(5n);
      expect(mod(-19n, -12n)).toEqual(-7n);
    });
  });

  describe('modMulInv()', () => {
    it('finds modular multiplicative inverse of a under modulo m', () => {
      expect(modMulInv(3, 11)).toEqual(4);
      expect(modMulInv(10, 17)).toEqual(12);
      expect(modMulInv(1, 1)).toEqual(1);
    });

    it('supports BigInt', () => {
      expect(modMulInv(3n, 11n)).toEqual(4n);
      expect(modMulInv(10n, 17n)).toEqual(12n);
      expect(modMulInv(1n, 1n)).toEqual(1n);
    });
  });

  describe('modPow()', () => {
    it('calculates base to the given power over given modulo m', () => {
      expect(modPow(-5, 2, 7)).toEqual(4);
      expect(modPow(2, 255, 64)).toEqual(0);
      expect(modPow(3, 3, 25)).toEqual(2);
      expect(modPow(38, 5, 97)).toEqual(39);
    });

    it('supports negative exponent', () => {
      expect(modPow(4, -1, 1)).toEqual(0);
      expect(modPow(4, -1, 19)).toEqual(5);
    });

    it('throws when modulus is zero', () => {
      expect(() => modPow(1, 1, 0)).toThrow(RangeError);
    });

    it('supports BigInt', () => {
      expect(modPow(2n, 255n, 64n)).toEqual(0n);
      expect(modPow(4n, -1n, 1n)).toEqual(0n);
      expect(modPow(4n, -1n, 19n)).toEqual(5n);
      expect(modPow(
        48116552563827n, 12139369866491111222698357067n, 119315717514047n,
      )).toEqual(21286856575014n);
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
