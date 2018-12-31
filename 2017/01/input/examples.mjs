import { example } from '../../../utils';

export default [
  example('1122', 3),
  example('1111', 4),
  example('1234', 0),
  example('91212129', 9),

  example('1212', null, 6),
  example('1221', null, 0),
  example('123425', null, 4),
  example('123123', null, 12),
  example('12131415', null, 4),
];
