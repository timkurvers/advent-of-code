import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    1 2 3 4 5 7 8 9 10 11
  `, 99),
];

export const partTwo = [
  example(partOne[0].input, 44),
];
