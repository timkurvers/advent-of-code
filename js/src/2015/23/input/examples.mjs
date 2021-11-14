import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    inc a
    jio a, +2
    tpl a
    inc a
  `, 2, { register: 'a' }),
];
