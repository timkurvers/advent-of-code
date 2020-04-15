import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    Hit Points: 13
    Damage: 8
  `, 226, { hp: 10, mp: 250 }),

  example(stripIndent`
    Hit Points: 14
    Damage: 8
  `, 641, { hp: 10, mp: 250 }),
];
