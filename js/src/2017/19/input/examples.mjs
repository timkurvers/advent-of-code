import { example } from '../../../utils';

export const partOne = [
  example(`     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+`, 'ABCDEF'),
];

export const partTwo = [
  example(partOne[0].input, 38),
];
