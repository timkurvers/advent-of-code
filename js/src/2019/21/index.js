import assert from 'assert';

import IntcodeProgram from '../02/IntcodeProgram';
import {
  Grid,
  fromASCII,
  solution,
  stripIndent,
  toASCII,
} from '../../utils';

const ground = '#';
const hole = '.';

const springscript = async (input, instructions) => {
  const program = IntcodeProgram.from(input);
  program.inputs = toASCII(instructions);

  await program.run();

  const { outputs } = program;
  const result = outputs[outputs.length - 1];
  if (result > 255) {
    return result;
  }
  console.log(fromASCII(outputs));
  return null;
};

// Simulates whether the springdroid can safely move across given tape using the
// given should-jump callback.
//
// If the droid falls in a hole, it visualizes its trail:
//
//       x                x    x           x
//      x x              x x  x x         x x
//   xxx   xxxxxxxxxxxxxx   xx   xxxxxxxxx   x
//   #####.################.##.#############.@.#########
//
const simulate = (tape, shouldJump) => {
  const { length } = tape;

  const grid = Grid.from(tape);
  let droid = grid.set(0, -1, 'x');
  const move = (dx, dy) => {
    droid = grid.set(droid.x + dx, droid.y + dy, 'x');
  };
  while (droid.x < length) {
    const scan = tape.slice(droid.x + 1, droid.x + 9);

    // If the droid is instructed to jump, it always jumps four spaces
    if (shouldJump(...scan)) {
      move(1, -1);
      move(1, -1);
      move(1, 1);
      move(1, 1);
    } else {
      move(1, 0);
    }

    // Droid fell in a hole, visualize the trail
    if (tape[droid.x] === hole) {
      grid.set(droid.x, droid.y + 1, '@');
      console.log(grid.toString());
      return false;
    }
  }
  return true;
};

export const partOne = solution((input) => {
  // Simulate using pure JavaScript
  const tape = '#####.################.##.#############...##############.#..########';
  const success = simulate(tape, (first, _, third, fourth) => (
    (first === hole || third === hole)
    && fourth === ground
  ));
  assert(success);

  // The above logic expressed in springscript
  return springscript(input, stripIndent`
    NOT A J
    NOT C T
    OR T J
    AND D J
    WALK
  `);
});

export const partTwo = solution((input) => {
  // Simulate using pure JavaScript
  const tape = '#####.################.##.#############...##############.#.##.##.#######.#..#############.##..#.#.###';
  const success = simulate(tape, (first, second, third, fourth, fifth, _, __, eighth) => (
    (
      (third === hole && (fifth === ground || eighth === ground))
      || second === hole
      || first === hole
    )
    && fourth === ground
  ));
  assert(success);

  // The above logic expressed in springscript
  return springscript(input, stripIndent`
    NOT C J
    OR E T
    OR H T
    AND T J
    NOT B T
    OR T J
    NOT A T
    OR T J
    AND D J
    RUN
  `);
});
