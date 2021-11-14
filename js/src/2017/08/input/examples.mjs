import { example } from '../../../utils';

export const partOne = [
  example(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`, 1),
];

export const partTwo = [
  example(partOne[0].input, 10),
];
