import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    .#.#.#
    ...##.
    #....#
    ..#...
    #.#..#
    ####..
  `, 4, { steps: 4 }),
];

export const partTwo = [
  example(partOne[0].input, 17, { steps: 5 }),
];
