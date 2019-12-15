/* eslint-disable no-param-reassign */

import IntcodeProgram from '../02/IntcodeProgram';
import {
  Grid,
  Orientation,
  Rotation,
  astar,
  dx,
  dy,
  solution,
} from '../../utils';

const Move = {
  [Orientation.UP]: 1,
  [Orientation.DOWN]: 2,
  [Orientation.LEFT]: 3,
  [Orientation.RIGHT]: 4,
};

const Output = {
  WALL: 0,
  MOVED: 1,
  GOAL: 2,
};

const Type = {
  UNKNOWN: '?',
  WALL: '#',
  VISITED: '.',
  GOAL: '$',
};

const explore = async (grid, { approach, program, start }) => {
  let orientation = Orientation.UP;
  let current = start;

  program.reset();
  program.run();

  while (true) {
    for (const rotation of approach) {
      let proposed = orientation + rotation + Math.PI * 2;
      proposed %= Math.PI * 2;
      program.input(Move[proposed]);
      const output = await program.output();

      const x = current.x + dx(proposed);
      const y = current.y + dy(proposed);

      if (output === Output.WALL) {
        grid.set(x, y, Type.WALL);
        continue;
      }

      if (output === Output.GOAL) {
        grid.set(x, y, Type.GOAL);
        program.halt = true;
        return;
      }

      orientation = proposed;
      current = grid.set(x, y, Type.VISITED);
      break;
    }
  }
};

export const partOne = solution(async (input) => {
  const program = IntcodeProgram.from(input);

  const grid = new Grid();
  const start = grid.set(0, 0, Type.VISITED);

  await explore(grid, {
    // See: https://en.wikipedia.org/wiki/Maze_solving_algorithm#Wall_follower
    approach: [
      Rotation.TURN_LEFT, Rotation.NONE,
      Rotation.TURN_RIGHT, Rotation.TURN_AROUND,
    ],
    program,
    start,
  });

  await explore(grid, {
    // See: https://en.wikipedia.org/wiki/Maze_solving_algorithm#Wall_follower
    approach: [
      Rotation.TURN_RIGHT, Rotation.NONE,
      Rotation.TURN_LEFT, Rotation.TURN_AROUND,
    ],
    program,
    start,
  });

  const goal = grid.find(point => point && point.value === Type.GOAL);

  const result = astar(start, goal, {
    neighborsFor: point => point.adjacentNeighbors.filter(neighbor => (
      neighbor.value !== Type.WALL
    )),
  });
  return result.score;
});
