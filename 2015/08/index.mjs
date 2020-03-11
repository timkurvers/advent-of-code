/* eslint-disable no-eval */

import { solution, sum } from '../../utils';

const parse = (input) => input.split('\n').map((code) => ({
  code,
  string: eval(code),
}));

const encode = (str) => JSON.stringify(str);

export const partOne = solution((input) => {
  const lines = parse(input);
  const code = sum(lines.map((line) => line.code.length));
  const string = sum(lines.map((line) => line.string.length));
  return code - string;
});

export const partTwo = solution((input) => {
  const lines = parse(input);
  const code = sum(lines.map((line) => line.code.length));
  const encoded = sum(lines.map((line) => encode(line.code).length));
  return encoded - code;
});
