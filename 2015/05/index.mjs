import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const parse = input => input.split('\n');

const VOWEL_MATCHER = /[aeiou]/g;
const DOUBLE_MATCHER = /(\w)\1/g;
const BLACKLIST_MATCHER = /ab|cd|pq|xy/g;

const isNice = (str) => {
  // At least three vowels
  const vowels = str.match(VOWEL_MATCHER);
  if (!vowels || vowels.length < 3) {
    return false;
  }

  // At least one double sequential letter
  if (!str.match(DOUBLE_MATCHER)) {
    return false;
  }

  // No blacklisted strings
  if (str.match(BLACKLIST_MATCHER)) {
    return false;
  }

  return true;
};

const ONE_APART_SAME_LETTERS = /(\w).\1/g;
const NON_OVERLAPPING_PAIR_MATCHER = /(\w\w).*?\1/g;

const isActuallyNice = (str) => {
  // At least one non-overlapping pair
  if (!str.match(NON_OVERLAPPING_PAIR_MATCHER)) {
    return false;
  }

  // At least one-apart same letters
  if (!str.match(ONE_APART_SAME_LETTERS)) {
    return false;
  }

  return true;
};

day(5).part(1).test(examples).feed(puzzleInput).solution(input => (
  parse(input).filter(isNice).length
));

day(5).part(2).test(examples).feed(puzzleInput).solution(input => (
  parse(input).filter(isActuallyNice).length
));
