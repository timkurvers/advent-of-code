import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    cpy 2 a
    tgl a
    tgl a
    tgl a
    cpy 1 a
    dec a
    dec a
  `, 3),
];
