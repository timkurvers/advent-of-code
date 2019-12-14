import { example } from '../../../utils';

export const partOne = [
  example(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`, 6),
];

export const partTwo = [
  example(partOne[0].input, 2),
];
