import { example } from '../../../utils';

export const partOne = [
  example('(())', 0),
  example('()()', 0),
  example('(((', 3),
  example('(()(()(', 3),
  example('))(((((', 3),
  example('())', -1),
  example('))(', -1),
  example(')))', -3),
  example(')())())', -3),
];

export const partTwo = [
  example(')', 1),
  example('()())', 5),
];
