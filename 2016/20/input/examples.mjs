import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    5-8
    0-2
    4-7
  `, 3),
];

export const partTwo = [
  example(stripIndent`
    5-8
    0-2
    4-7
    6-7
  `, 4294967296 - 8),
];
