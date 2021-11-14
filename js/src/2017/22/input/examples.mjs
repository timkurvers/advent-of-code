import { example } from '../../../utils';

export const partOne = [
  example(`..#
#..
...`, 5587),
];

export const partTwo = [
  example.inefficient(partOne[0].input, 2511944),
];
