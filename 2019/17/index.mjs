/* eslint-disable no-cond-assign */

import IntcodeProgram from '../02/IntcodeProgram';
import {
  Grid,
  Orientation,
  Rotation,
  dx,
  dy,
  fromASCII,
  solution,
  stripIndent,
  sum,
  toASCII,
} from '../../utils';

const Type = {
  SCAFFOLD: '#',
};

const scan = async (input) => {
  const program = IntcodeProgram.from(input);
  await program.run();

  const gfx = fromASCII(program.outputs);
  const grid = Grid.from(gfx);
  return grid;
};

export const partOne = solution(async (input, { gridFromInput }) => {
  const grid = gridFromInput ? Grid.from(input) : await scan(input);

  const intersections = grid.filter((point) => (
    point.value === Type.SCAFFOLD
    && point.down && point.down.value === Type.SCAFFOLD
    && point.left && point.left.value === Type.SCAFFOLD
    && point.right && point.right.value === Type.SCAFFOLD
    && point.up && point.up.value === Type.SCAFFOLD
  ));

  return sum(intersections.map((point) => point.x * point.y));
});

export const partTwo = solution(async (input) => {
  const grid = await scan(input);

  // Start facing upwards
  const start = grid.find((point) => point.value === '^');
  let current = start;
  let orientation = Orientation.UP;

  // Steps once using given rotation, returning point if valid, null otherwise
  const step = (rotation) => {
    const proposed = orientation + rotation;
    const point = grid.getPoint(
      current.x + dx(proposed),
      current.y + dy(proposed),
    );
    return point && point.value === Type.SCAFFOLD ? point : null;
  };

  const path = [];
  while (true) {
    let next;

    // Attempt moving forwards
    if (next = step(Rotation.NONE)) {
      if (!path.length) {
        path.push(0);
      }
      path[path.length - 1]++;
      current = next;
      continue;
    }

    // Attempt turning left/right
    if (next = step(Rotation.TURN_LEFT)) {
      path.push('L', 0);
      orientation += Rotation.TURN_LEFT;
      continue;
    } else if (next = step(Rotation.TURN_RIGHT)) {
      path.push('R', 0);
      orientation += Rotation.TURN_RIGHT;
      continue;
    }

    // No options, assume end was reached
    break;
  }

  // Extracts factors from format string: A (A)* B (A|B)* C (A|B|C)*
  // Adapted from: https://www.reddit.com/r/adventofcode/comments/ebr7dg/2019_day_17_solutions/fb7ymcw/
  const factorize = /^(?<A>.{1,14})\k<A>*(?<B>.{1,14})(?:\k<A>|\k<B>)*(?<C>.{1,14})(?:\k<A>|\k<B>|\k<C>)*$/;

  // Inserts commas between letters and numbers (R18L1 => R,18,L,1)
  const commafy = (str) => str.replace(/(?!^)(\d+|[^\d])/g, ',$1');

  // Construct the main routine consisting solely of A, B, and C calls
  let main = path.join('');
  const { groups } = main.match(factorize);
  for (const [letter, slice] of Object.entries(groups)) {
    main = main.replace(new RegExp(slice, 'g'), letter);
  }

  // Prepare instructions, run program and return result
  const instructions = stripIndent`
    ${commafy(main)}
    ${commafy(groups.A)}
    ${commafy(groups.B)}
    ${commafy(groups.C)}
    n
  `;
  const program = IntcodeProgram.from(input);
  program.memory[0] = 2;
  program.inputs = toASCII(instructions);
  await program.run();
  const { outputs } = program;
  return outputs[outputs.length - 1];
});
