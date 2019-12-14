import { example } from '../../../utils';

export const partOne = [
  example(`<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`, 179, { steps: 10 }),

  example(`<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`, 1940, { steps: 100 }),
];

export const partTwo = [
  example(partOne[0].input, 2772),
];
