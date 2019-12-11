import IntcodeProgram from '../02/IntcodeProgram';
import {
  Grid,
  Orientation,
  Rotation,
  dx,
  dy,
  identity,
  solution,
} from '../../utils';

const Panel = {
  BLACK: 0,
  WHITE: 1,
};

const Turn = {
  LEFT: 0,
  RIGHT: 1,
};

const run = async (input, { initialPanel = Panel.BLACK } = {}) => {
  const program = IntcodeProgram.from(input);

  const grid = new Grid();

  program.run();

  let orientation = Orientation.UP;
  let x = 0;
  let y = 0;
  grid.set(x, y, initialPanel);

  while (!program.halt) {
    const value = grid.get(x, y) || Panel.BLACK;
    program.input(value);

    const paint = await program.output();
    const turn = await program.output();

    grid.set(x, y, paint);

    if (turn === Turn.LEFT) {
      orientation += Rotation.TURN_LEFT;
    } else {
      orientation += Rotation.TURN_RIGHT;
    }

    x += dx(orientation);
    y += dy(orientation);
  }

  return grid;
};

export const partOne = solution.inefficient(async (input) => {
  const grid = await run(input);
  return grid.filter(identity).length;
});

export const partTwo = solution(async (input) => {
  const grid = await run(input, { initialPanel: Panel.WHITE });

  const output = grid.toString((point) => {
    if (point && point.value === Panel.WHITE) {
      return '#';
    }
    return ' ';
  });
  console.log();
  console.log(output);

  return '<see visually above>';
});
