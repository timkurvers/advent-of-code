import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    F10
    N3
    F7
    R90
    F11
  `, 25),
];

export const partTwo = [
  example(partOne[0].input, 286),
];
