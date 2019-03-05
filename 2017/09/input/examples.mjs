import { example } from '../../../utils';

export default [
  example('{}', 1),
  example('{{{}}}', 6),
  example('{{},{}}', 5),
  example('{{{},{},{{}}}}', 16),
  example('{<a>,<a>,<a>,<a>}', 1),
  example('{{<ab>},{<ab>},{<ab>},{<ab>}}', 9),
  example('{{<!!>},{<!!>},{<!!>},{<!!>}}', 9),
  example('{{<a!>},{<a!>},{<a!>},{<ab>}}', 3),

  example('{<>}', null, 0),
  example('{<random characters>}', null, 17),
  example('{<<<<>}', null, 3),
  example('{<{!>}>}', null, 2),
  example('{<!!>}', null, 0),
  example('{<!!!>>}', null, 0),
  example('{<{o"i!a,<{i<a>}', null, 10),
];
