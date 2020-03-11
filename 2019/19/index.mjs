import IntcodeProgram from '../02/IntcodeProgram';
import { Grid, solution } from '../../utils';

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
