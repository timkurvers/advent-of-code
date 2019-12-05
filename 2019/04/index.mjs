import { day } from '..';
import { range } from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const parse = (input) => {
  const [start, end] = input.split('-');
  return range({ start: +start, end: +end }).map(String);
};

const ADJACENT_DIGITS_MATCHER = /(\d)\1+/g;

const isStrictlyDouble = str => str.length === 2;
const isDouble = str => str.length >= 2;

const isValid = (password, { adjacentPredicate = isDouble } = {}) => {
  const { length } = password;
  for (let i = 0; i < length; ++i) {
    const char = password[i];
    const next = password[i + 1];

    // Not valid if digits decrease going from left to right
    if (next && next - char < 0) {
      return false;
    }
  }

  // Not valid if no adjacent digits were found or none of them match predicate
  const adjacents = password.match(ADJACENT_DIGITS_MATCHER);
  if (!adjacents || !adjacents.some(adjacentPredicate)) {
    return false;
  }

  return true;
};

const isStrictlyValid = password => (
  isValid(password, { adjacentPredicate: isStrictlyDouble })
);

day(4).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const passwords = parse(input);
  return passwords.filter(isValid).length;
});

day(4).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const passwords = parse(input);
  return passwords.filter(isStrictlyValid).length;
});