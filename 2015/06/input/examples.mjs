import { example } from '../../../utils';

export const partOne = [
  example('turn on 0,0 through 4,4', 25),
  example('toggle 2,2 through 3,3', 4),
  example(`turn on 0,0 through 4,4
turn off 1,1 through 3,3`, 16),
];

export const partTwo = [
  example(`turn on 0,0 through 4,4
turn on 1,1 through 3,3
toggle 2,2 through 2,2`, 36),
];
