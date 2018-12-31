import { example } from '../../../utils';

export default [
  example('aa bb cc dd ee', 1),
  example('aa bb cc dd aa', 0),
  example('aa bb cc dd aaa', 1),

  example('abcde fghij', null, 1),
  example('abcde xyz ecdab', null, 0),
  example('a ab abc abd abf abj', null, 1),
  example('iiii oiii ooii oooi oooo', null, 1),
  example('oiii ioii iioi iiio', null, 0),
];
