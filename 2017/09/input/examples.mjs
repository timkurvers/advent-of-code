import { example } from '../../../utils';

export const partOne = [
  example('{}', 1),
  example('{{{}}}', 6),
  example('{{},{}}', 5),
  example('{{{},{},{{}}}}', 16),
  example('{<a>,<a>,<a>,<a>}', 1),
  example('{{<ab>},{<ab>},{<ab>},{<ab>}}', 9),
  example('{{<!!>},{<!!>},{<!!>},{<!!>}}', 9),
  example('{{<a!>},{<a!>},{<a!>},{<ab>}}', 3),
];

export const partTwo = [
  example('{<>}', 0),
  example('{<random characters>}', 17),
  example('{<<<<>}', 3),
  example('{<{!>}>}', 2),
  example('{<!!>}', 0),
  example('{<!!!>>}', 0),
  example('{<{o"i!a,<{i<a>}', 10),
];
