import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    ....#
    #..#.
    #..##
    ..#..
    #....
  `, 2129920),
];

export const partTwo = [
  example(partOne[0].input, 99, { minutes: 10 }),
];
