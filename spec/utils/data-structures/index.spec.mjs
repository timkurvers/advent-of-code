import {
  intersection, range, shuffle, wrap, zip,
} from '../../../utils';

describe('data structure utilities', () => {
  describe('intersection()', () => {
    it('returns intersection of given arrays', () => {
      const a = [1, 2, 3, 4];
      const b = [2, 4, 5];
      const c = [2, 3, 4, 5];
      expect(intersection(a, b, c)).toEqual([2, 4]);
      expect(intersection(a, b)).toEqual([2, 4]);
      expect(intersection(a, c)).toEqual([2, 3, 4]);
      expect(intersection(b, c)).toEqual([2, 4, 5]);
    });
  });

  describe('range()', () => {
    it('generates a range until given end index', () => {
      expect(range({ end: 3 })).toEqual([0, 1, 2, 3]);
    });

    it('generates a range from given start index until given end index', () => {
      expect(range({ start: 2, end: 3 })).toEqual([2, 3]);
    });

    it('generates a range of given length', () => {
      expect(range({ length: 3 })).toEqual([0, 1, 2]);
    });

    it('generates a range from given start index of given length', () => {
      expect(range({ start: 2, length: 2 })).toEqual([2, 3]);
    });
  });

  describe('shuffle()', () => {
    it('shuffles given array in-place', () => {
      const mock = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      const array = [1, 2, 3, 4];
      shuffle(array);
      expect(array).toEqual([1, 4, 2, 3]);
      mock.mockRestore();
    });
  });

  describe('wrap()', () => {
    const length = 4;

    it('wraps given index ensuring it is within bounds of given length', () => {
      expect(wrap(0, length)).toEqual(0);
      expect(wrap(1, length)).toEqual(1);
      expect(wrap(2, length)).toEqual(2);
      expect(wrap(3, length)).toEqual(3);
      expect(wrap(4, length)).toEqual(0);
      expect(wrap(13, length)).toEqual(1);
    });

    it('wraps given negative index ensuring it is within bounds of given length', () => {
      expect(wrap(-1, length)).toEqual(3);
      expect(wrap(-2, length)).toEqual(2);
      expect(wrap(-3, length)).toEqual(1);
      expect(wrap(-4, length)).toEqual(0);
      expect(wrap(-5, length)).toEqual(3);
    });
  });

  describe('zip()', () => {
    it('zips given arrays together', () => {
      const names = ['Bob', 'Pete', 'Jacky'];
      const ages = [21, 44, 75];
      const hasJob = [true, true, false];
      expect(zip(names, ages, hasJob)).toEqual([
        ['Bob', 21, true],
        ['Pete', 44, true],
        ['Jacky', 75, false],
      ]);
    });
  });
});
