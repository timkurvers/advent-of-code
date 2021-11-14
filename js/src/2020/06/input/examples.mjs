import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    abcx
    abcy
    abcz
  `, 6),

  example(stripIndent`
    abc

    a
    b
    c

    ab
    ac

    a
    a
    a
    a

    b
  `, 11),
];

export const partTwo = [
  example(partOne[1].input, 6),
];
