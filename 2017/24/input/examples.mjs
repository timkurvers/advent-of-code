import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    0/2
    2/2
    2/3
    3/4
    3/5
    0/1
    10/1
    9/10
  `, 31),

  // Edge-case example for non-start zeroes (found on Reddit)
  example(stripIndent`
    0/1
    1/2
    0/2
    0/3
    3/4
  `, 16),
];

export const partTwo = [
  example(partOne[0].input, 19),
];
