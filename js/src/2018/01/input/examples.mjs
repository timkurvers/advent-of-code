import { example } from '../../../utils';

export const partOne = [
  example('+1, -2, +3, +1', 3),
  example('+1, +1, +1', 3),
  example('+1, +1, -2', 0),
  example('-1, -2, -3', -6),
];

export const partTwo = [
  example(partOne[0].input, 2),
  example('+1, -1', 0),
  example('+3, +3, +4, -2, -4', 10),
  example('-6, +3, +8, +5, -6', 5),
  example('+7, +7, -2, -7, -4', 14),
];
