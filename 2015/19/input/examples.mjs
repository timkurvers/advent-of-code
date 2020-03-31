import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    H => HO
    H => OH
    O => HH

    HOH
  `, 4),

  example(stripIndent`
    H => HO
    H => OH
    O => HH

    HOHOHO
  `, 7),
];

export const partTwo = [
  example(stripIndent`
    e => H
    e => O
    H => HO
    H => OH
    O => HH

    HOH
  `, 3),

  example(stripIndent`
    e => H
    e => O
    H => HO
    H => OH
    O => HH

    HOHOHO
  `, 6),
];
