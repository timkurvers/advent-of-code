import { example } from '../../../utils';

export default [
  example(`..#
#..
...`, 5587),

  example.inefficient(`..#
#..
...`, null, 2511944),
];
