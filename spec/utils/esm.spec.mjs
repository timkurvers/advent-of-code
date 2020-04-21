import { basename, dirname } from '../../utils';

describe('ESM utilities', () => {
  const path = 'file:///advent-of-code/year/day/file.mjs';

  describe('basename()', () => {
    it('returns base name of given path', () => {
      expect(basename(path)).toEqual('file.mjs');
    });
  });

  describe('dirname()', () => {
    it('returns directory name of given path', () => {
      expect(dirname(path)).toEqual('/advent-of-code/year/day');
    });
  });
});
