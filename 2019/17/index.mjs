import IntcodeProgram from '../02/IntcodeProgram';
import { Grid, solution, sum } from '../../utils';

const Type = {
  SCAFFOLD: '#',
};

const scan = async (input) => {
  const program = IntcodeProgram.from(input);
  await program.run();

  const gfx = String.fromCharCode(...program.outputs);
  const grid = Grid.from(gfx);
  return grid;
};

export const partOne = solution(async (input, { gridFromInput }) => {
  const grid = gridFromInput ? Grid.from(input) : await scan(input);

  const intersections = grid.filter(point => (
    point.value === Type.SCAFFOLD
    && point.down && point.down.value === Type.SCAFFOLD
    && point.left && point.left.value === Type.SCAFFOLD
    && point.right && point.right.value === Type.SCAFFOLD
    && point.up && point.up.value === Type.SCAFFOLD
  ));

  return sum(intersections.map(point => point.x * point.y));
});
