import { example } from '../../../utils';

export default [
  example('(())', 0),
  example('()()', 0),
  example('(((', 3),
  example('(()(()(', 3),
  example('))(((((', 3),
  example('())', -1),
  example('))(', -1),
  example(')))', -3),
  example(')())())', -3),

  example(')', null, 1),
  example('()())', null, 5),
];
