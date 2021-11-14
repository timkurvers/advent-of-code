import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL
  `, 37),
];

export const partTwo = [
  example(partOne[0].input, 26),
];
