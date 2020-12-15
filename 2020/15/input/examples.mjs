import { example } from '../../../utils';

export const partOne = [
  example('0,3,6', 0, { turn: 10 }),
  example('0,3,6', 436),
  example('1,3,2', 1),
  example('2,1,3', 10),
  example('1,2,3', 27),
  example('2,3,1', 78),
  example('3,2,1', 438),
  example('3,1,2', 1836),
];

export const partTwo = [
  example('0,3,6', 175594),
  example('1,3,2', 2578),
  example('2,1,3', 3544142),
  example('1,2,3', 261214),
  example('2,3,1', 6895259),
  example('3,2,1', 18),
  example('3,1,2', 362),
];
