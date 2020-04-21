import {
  flatMap,
  range,
  sum,
  wrap,
} from '../../../utils';

describe('data structure utilities', () => {
  describe('flatMap()', () => {
    it('invokes given callback for all entries and flattens results', () => {
      const result = flatMap([[1, 2], [3], [1, 2, 3]], sum);
      expect(result).toEqual([3, 3, 6]);
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
});
