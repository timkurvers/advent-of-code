import { example } from '../../../utils';

export const partOne = [
  example('aa bb cc dd ee', 1),
  example('aa bb cc dd aa', 0),
  example('aa bb cc dd aaa', 1),
];

export const partTwo = [
  example('abcde fghij', 1),
  example('abcde xyz ecdab', 0),
  example('a ab abc abd abf abj', 1),
  example('iiii oiii ooii oooi oooo', 1),
  example('oiii ioii iioi iiio', 0),
];
