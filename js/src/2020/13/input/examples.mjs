import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    939
    7,13,x,x,59,x,31,19
  `, 295),
];

export const partTwo = [
  example(partOne[0].input, 1068781, { isFeasible: true }),
];
