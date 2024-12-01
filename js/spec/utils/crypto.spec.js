import { hexmd5 } from '../../src/utils/index.js';

describe('crypto utilities', () => {
  describe('hexmd5()', () => {
    it('generates a hexadecimal MD5 digest of given string', () => {
      expect(
        hexmd5('The quick brown fox jumps over the lazy dog'),
      ).toEqual('9e107d9d372bb6826bd81d3542a419d6');

      expect(
        hexmd5(''),
      ).toEqual('d41d8cd98f00b204e9800998ecf8427e');
    });
  });
});
