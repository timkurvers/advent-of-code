import {
  toASCII,
  fromASCII,
  stripIndent,
  humanize,
  reverse,
  titleize,
} from '../../src/utils';

describe('string utilities', () => {
  describe('toASCII()', () => {
    it('converts given string to an ASCII array of character codes', () => {
      expect(toASCII('AoC')).toEqual([65, 111, 67]);
    });
  });

  describe('fromASCII()', () => {
    it('converts given single ASCII character code to a string', () => {
      expect(fromASCII(111)).toEqual('o');
    });

    it('converts given ASCII character codes to a string', () => {
      expect(fromASCII([65, 111, 67])).toEqual('AoC');
    });
  });

  describe('reverse()', () => {
    it('reverses given string', () => {
      expect(reverse('')).toEqual('');
      expect(reverse('abc')).toEqual('cba');
      expect(reverse('abcd')).toEqual('dcba');
    });
  });

  describe('stripIndent()', () => {
    it('strips indentation from given string', () => {
      const stripped = stripIndent`
        {
          // code block
        }
      `;
      expect(stripped).toEqual('{\n  // code block\n}\n');
    });

    it('keeps strings without indentation intact', () => {
      expect(stripIndent`not indented`).toEqual('not indented');
    });
  });

  describe('humanize()', () => {
    it('transforms given string into a human-readable one', () => {
      expect(humanize('partOne')).toEqual('Part one');
      expect(humanize('åKjøre')).toEqual('Å kjøre');
      expect(humanize('UTFConverter')).toEqual('Utf converter');
    });

    it('supports not capitalizing the result', () => {
      const options = {
        capitalize: false,
      };
      expect(humanize('partOne', options)).toEqual('part one');
      expect(humanize('åKjøre', options)).toEqual('å kjøre');
      expect(humanize('UTFConverter', options)).toEqual('utf converter');
    });
  });

  describe('titleize()', () => {
    it('transforms given string into a capitalized human-readable one', () => {
      expect(titleize('partOne')).toEqual('Part One');
      expect(titleize('åKjøre')).toEqual('Å Kjøre');
      expect(titleize('UTFConverter')).toEqual('Utf Converter');
    });
  });
});
