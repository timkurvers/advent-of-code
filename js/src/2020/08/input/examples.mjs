import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    nop +0
    acc +1
    jmp +4
    acc +3
    jmp -3
    acc -99
    acc +1
    jmp -4
    acc +6
  `, 5),
];

export const partTwo = [
  example(partOne[0].input, 8),
];
