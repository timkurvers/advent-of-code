import { example } from '../../../utils';

export default [
  example('>', 2, 2),
  example('^>v<', 4, 3),
  example('^v^v^v^v^v', 2, 11),

  example('^v', null, 3),
];
