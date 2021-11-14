import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    16
    10
    15
    5
    1
    11
    7
    19
    6
    12
    4
  `, 7 * 5),

  example(stripIndent`
    28
    33
    18
    42
    31
    14
    46
    20
    48
    47
    24
    23
    49
    45
    19
    38
    39
    11
    1
    32
    25
    35
    8
    17
    7
    9
    4
    2
    34
    10
    3
  `, 22 * 10),
];

export const partTwo = [
  example(partOne[0].input, 8),
  example(partOne[1].input, 19208),
];
