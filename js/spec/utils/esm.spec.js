import { basename, dirname } from '../../src/utils';

describe('ESM utilities', () => {
  const path = 'file:///advent-of-code/year/day/file.js';

  describe('basename()', () => {
    it('returns base name of given path', () => {
      expect(basename(path)).toEqual('file.js');
    });
  });

  describe('dirname()', () => {
    it('returns directory name of given path', () => {
      expect(dirname(path)).toEqual('/advent-of-code/year/day');
    });
  });
});
