import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc
  `, 2),
];

export const partTwo = [
  example(partOne[0].input, 1),
];
