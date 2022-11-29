import IntcodeProgram from '../02/IntcodeProgram';
import { Grid, bisect, solution } from '../../utils';

const Type = {
  BEAM: '#',
  EMPTY: '.',
};

export const partOne = solution(async (input) => {
  const grid = new Grid();

  const program = IntcodeProgram.from(input);
  for (let y = 0; y < 50; ++y) {
    for (let x = 0; x < 50; ++x) {
      program.reset();
      program.input(x);
      program.input(y);
      await program.run();
      const result = await program.output();
      grid.set(x, y, result ? Type.BEAM : Type.EMPTY);
    }
  }

  return grid.filter((point) => point.value === Type.BEAM).length;
});

export const partTwo = solution.inefficient(async (input, { size = 100 }) => {
  const bound = size * 10;
  const grid = new Grid();

  const program = IntcodeProgram.from(input);

  // Whether given coordinate is the top-left of a square of given size
  const square = async (tlx, tly) => {
    for (let y = tly; y < tly + size; ++y) {
      for (let x = tlx; x < tlx + size; ++x) {
        let result = grid.get(x, y);
        if (!result) {
          program.reset();
          program.input(x);
          program.input(y);
          await program.run();
          const output = await program.output();
          result = output ? Type.BEAM : Type.EMPTY;
          grid.set(x, y, result);
        }
        if (result !== Type.BEAM) {
          return false;
        }
      }
    }
    return true;
  };

  // Holds top-left x values for found squares keyed by y-value
  const xs = new Map();

  // Whether row of y-value is the top of a square of given size
  const detect = async (y) => {
    for (let x = 0; x < bound; ++x) {
      if (await square(x, y)) {
        xs.set(y, x);
        return true;
      }
    }
    return false;
  };

  // Find row of first occurrence of a square of given size by bisecting
  const y = await bisect({
    lower: 0,
    upper: bound,
    until: detect,
  });
  const x = xs.get(y);
  return x * 10000 + y;
});
