import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0
  `, 165),
];

export const partTwo = [
  example(stripIndent`
    mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1
  `, 208),
];
