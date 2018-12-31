import { example } from '../../../utils';

export default [
  example('+1, -2, +3, +1', 3, 2),
  example('+1, +1, +1', 3),
  example('+1, +1, -2', 0),
  example('-1, -2, -3', -6),

  example('+1, -1', null, 0),
  example('+3, +3, +4, -2, -4', null, 10),
  example('-6, +3, +8, +5, -6', null, 5),
  example('+7, +7, -2, -7, -4', null, 14),
];
