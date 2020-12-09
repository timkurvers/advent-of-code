import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576
  `, 127, { preambleLength: 5 }),
];

export const partTwo = [
  example(partOne[0].input, 62, partOne[0].args),
];
