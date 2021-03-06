import { example } from '../../../utils';

export const partOne = [
  example(`R8,U5,L5,D3
U7,R6,D4,L4`, 6),

  example(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`, 159),

  example(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`, 135),

  example(`R5,U2,L5
U5,R2,D3`, 2),
];

export const partTwo = [
  example(partOne[0].input, 30),
  example(partOne[1].input, 610),
  example(partOne[2].input, 410),
  example(partOne[3].input, 14),
];
