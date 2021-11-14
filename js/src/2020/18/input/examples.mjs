import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    1 + 2 * 3 + 4 * 5 + 6
    1 + (2 * 3) + (4 * (5 + 6))
  `, 122),
  example('2 * 3 + (4 * 5)', 26),
  example('5 + (8 * 3 + 9 + 3 * 4 * 3)', 437),
  example('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 12240),
  example('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 13632),
];


export const partTwo = [
  example('1 + 2 * 3 + 4 * 5 + 6', 231),
  example('1 + (2 * 3) + (4 * (5 + 6))', 51),
  example('2 * 3 + (4 * 5)', 46),
  example('5 + (8 * 3 + 9 + 3 * 4 * 3)', 1445),
  example('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 669060),
  example('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 23340),
];
