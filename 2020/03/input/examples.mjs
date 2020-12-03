import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    ..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#
  `, 7),
];

export const partTwo = [
  example(partOne[0].input, 336),
];
