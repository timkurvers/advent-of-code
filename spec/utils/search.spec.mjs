import { bisect, range } from '../../utils';

describe('search utilities', () => {
  describe('bisect()', () => {
    it('finds lowest value where given condition is truthy', async () => {
      const start = 0;
      const end = 10;
      const indices = range({ start, end });

      for (const index of indices) {
        expect(await bisect({
          lower: start,
          upper: end,
          until: (x) => x >= index,
        })).toEqual(index);
      }
    });

    it('supports values larger than 32-bit', async () => {
      const value = 2 ** 32;
      const target = value + 2;
      expect(await bisect({
        lower: value,
        upper: value + 4,
        until: (x) => x >= target,
      })).toEqual(target);
    });
  });
});
