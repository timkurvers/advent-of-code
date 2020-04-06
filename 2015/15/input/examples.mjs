import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
    Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
  `, 62842880),
];

export const partTwo = [
  example(partOne[0].input, 57600000),
];
