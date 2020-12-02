import { solution } from '../../utils';

const PWDB_ROW_MATCHER = /(?<min>\d+)-(?<max>\d+) (?<char>.): (?<pw>.+)/;

const parse = (input) => input.trim().split('\n').map((line) => {
  const { groups } = PWDB_ROW_MATCHER.exec(line);
  return {
    policy: {
      char: groups.char,
      min: +groups.min,
      max: +groups.max,
    },
    pw: groups.pw,
  };
});

const isValidUsingOccurences = ({ policy, pw }) => {
  const { char, min, max } = policy;
  const occurences = Array.from(pw.matchAll(char)).length;
  return min <= occurences && occurences <= max;
};

const isValidUsingPositions = ({ policy, pw }) => {
  const { char, min: pos1, max: pos2 } = policy;
  return pw[pos1 - 1] === char ^ pw[pos2 - 1] === char;
};

export const partOne = solution((input) => {
  const pwdb = parse(input);
  return pwdb.filter(isValidUsingOccurences).length;
});

export const partTwo = solution((input) => {
  const pwdb = parse(input);
  return pwdb.filter(isValidUsingPositions).length;
});
