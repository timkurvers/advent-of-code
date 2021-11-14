import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    Player 1:
    9
    2
    6
    3
    1

    Player 2:
    5
    8
    4
    7
    10
  `, 306),
];

export const partTwo = [
  example(partOne[0].input, 291),
];
