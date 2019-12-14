import { example } from '../../../utils';

export const partOne = [
  example('ne,ne,ne', 3),
  example('ne,ne,sw,sw', 0),
  example('ne,ne,s,s', 2),
  example('se,sw,se,sw,sw', 3),
];

export const partTwo = [
  example(partOne[0].input, 3),
  example(partOne[1].input, 2),
  example(partOne[2].input, 2),
  example(partOne[3].input, 3),
];
