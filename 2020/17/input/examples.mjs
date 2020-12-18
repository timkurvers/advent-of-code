import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    .#.
    ..#
    ###
  `, 112),
];

export const partTwo = [
  example.inefficient(partOne[0].input, 848),
];
