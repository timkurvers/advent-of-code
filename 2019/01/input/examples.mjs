import { example } from '../../../utils';

export const partOne = [
  example('12', 2),
  example('14', 2),
  example('1969', 654),
  example('100756', 33583),
];

export const partTwo = [
  example(partOne[1].input, 2),
  example(partOne[2].input, 966),
  example(partOne[3].input, 50346),
];
