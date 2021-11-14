import { example } from '../../../utils';

export const partOne = [
  example(`#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`, 36334),

  example(`#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`, 27730),

  example(`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`, 39514),

  example(`#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`, 27755),

  example(`#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`, 28944),

  example(`#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`, 18740),
];

export const partTwo = [
  example(partOne[1].input, 4988),
  example(partOne[2].input, 31284), // TODO: Fails
  example(partOne[3].input, 3478),
  example(partOne[4].input, 6474),
  example(partOne[5].input, 1140),
];
