import { example } from '../../../utils';

export const partOne = [
  example(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`, 17),
];

export const partTwo = [
  example(partOne[0].input, 16, { target: 32 }),
];
