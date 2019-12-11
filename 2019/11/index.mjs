import Program from '../02/Program';
import {
  Grid,
  Orientation,
  Rotation,
  dx,
  dy,
  identity,
  solution,
  wait,
} from '../../utils';
import * as operations from '../09/operations';

const Panel = {
  BLACK: 0,
  WHITE: 1,
};

const Direction = {
  LEFT: 0,
  RIGHT: 1,
};

const run = async (input, { initialPanel = Panel.BLACK } = {}) => {
  const program = Program.from(input, operations);

  const grid = new Grid();

  const result = async () => {
    let output = program.outputs.shift();
    while (output === undefined) {
      await wait(1);
      output = program.outputs.shift();
    }
    return output;
  };

  program.run();

  let orientation = Orientation.UP;
  let x = 0;
  let y = 0;
  grid.set(x, y, initialPanel);

  while (!program.halt) {
    const value = grid.get(x, y) || Panel.BLACK;
    program.inputs.push(value);

    const paint = await result();
    const turn = await result();

    grid.set(x, y, paint);

    if (turn === Direction.LEFT) {
      orientation += Rotation.TURN_LEFT;
    } else {
      orientation += Rotation.TURN_RIGHT;
    }

    x += dx(orientation);
    y += dy(orientation);
  }

  return grid;
};

export const partOne = solution(async (input) => {
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
