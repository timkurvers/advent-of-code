import { patterns } from '../../src/utils/index.js';

const {
  entirely, literal, oneOf, sequence,
} = patterns;

describe('pattern matching utilities', () => {
  describe('entirely()', () => {
    it('creates a matcher to match a string in its entirety', () => {
      const matcher = entirely(sequence(
        literal('a'),
        oneOf(
          literal('b'),
          sequence(literal('b'), literal('c')),
        ),
        literal('d'),
      ));
      expect(matcher('abd')).toBe('abd');
      expect(matcher('abcd')).toBe('abcd');
      expect(matcher('ad')).toBe(false);
      expect(matcher('acd')).toBe(false);
    });
  });

  describe('oneOf()', () => {
    it('creates a matcher to match one of given patterns', () => {
      const matcher = oneOf(
        literal('a'),
        literal('b'),
        sequence(literal('a'), literal('a'), literal('b')),
        oneOf(literal('a'), literal('c')),
      );
      expect(matcher('a')).toEqual(['a', 'a']);
      expect(matcher('b')).toEqual(['b']);
      expect(matcher('aab')).toEqual(['a', 'aab', 'a']);
      expect(matcher('c')).toEqual(['c']);
    });
  });

  describe('literal()', () => {
    it('creates a matcher to match a literal', () => {
      const matcher = literal('ab');
      expect(matcher('a')).toEqual([]);
      expect(matcher('b')).toEqual([]);
      expect(matcher('ab')).toEqual(['ab']);
      expect(matcher('abc')).toEqual(['ab']);
    });
  });

  describe('sequence()', () => {
    it('creates a matcher to match a sequence of patterns', () => {
      const matcher = sequence(
        literal('a'),
        oneOf(literal('b'), literal('c')),
      );
      expect(matcher('ab')).toEqual(['ab']);
      expect(matcher('ac')).toEqual(['ac']);
      expect(matcher('a')).toEqual([]);
    });
  });

  describe('recursion', () => {
    it('supports recursion', () => {
      const a = literal('a');
      const b = literal('b');

      // Rule 1: a | a 1
      const rule1 = (defer) => oneOf(a, sequence(a, rule1))(defer);

      // Rule 2: a b
      const rule2 = sequence(a, b);

      // Rule 0: 1 2
      const rule0 = sequence(rule1, rule2);

      const isValid = (input) => entirely(rule0)(input) === input;
      expect(isValid('ab')).toBe(false);
      expect(isValid('aab')).toBe(true);
      expect(isValid('aaab')).toBe(true);
      expect(isValid('aaaab')).toBe(true);
      expect(isValid('aaaaab')).toBe(true);
      expect(isValid('aaaaaab')).toBe(true);
    });
  });
});
