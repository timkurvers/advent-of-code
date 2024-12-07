import IntcodeProgram from '../02/IntcodeProgram.js';
import { Grid, Orientation, Rotation, astar, dx, dy, solution } from '../../utils/index.js';

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
  EMPTY: '.',
  OXYGEN: 'O',
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
        grid.set(x, y, Type.OXYGEN);
        program.halt = true;
        return;
      }

      orientation = proposed;
      current = grid.set(x, y, Type.EMPTY);
      break;
    }
  }
};

const build = async (input) => {
  const program = IntcodeProgram.from(input);

  const grid = new Grid();
  const start = grid.set(0, 0, Type.EMPTY);

  await explore(grid, {
    // See: https://en.wikipedia.org/wiki/Maze_solving_algorithm#Wall_follower
    approach: [Rotation.TURN_LEFT, Rotation.NONE, Rotation.TURN_RIGHT, Rotation.TURN_AROUND],
    program,
    start,
  });

  await explore(grid, {
    // See: https://en.wikipedia.org/wiki/Maze_solving_algorithm#Wall_follower
    approach: [Rotation.TURN_RIGHT, Rotation.NONE, Rotation.TURN_LEFT, Rotation.TURN_AROUND],
    program,
    start,
  });

  const goal = grid.find((point) => point && point.value === Type.OXYGEN);

  return { grid, goal, start };
};

export const partOne = solution(async (input) => {
  const { start, goal } = await build(input);
  const result = astar(start, goal, {
    neighborsFor: (point) => point.adjacentNeighbors.filter((neighbor) => neighbor.value !== Type.WALL),
  });
  return result.score;
});

export const partTwo = solution(async (input, { gridFromInput }) => {
  const grid = gridFromInput ? Grid.from(input) : (await build(input)).grid;
  const start = grid.find((point) => point && point.value === Type.OXYGEN);

  const remaining = new Set([start]);

  let mins = -1;
  while (remaining.size) {
    const queue = new Set(remaining);
    for (const point of queue) {
      grid.set(point.x, point.y, Type.OXYGEN);
      remaining.delete(point);

      const accessible = point.adjacentNeighbors.filter((neighbor) => neighbor.value === Type.EMPTY);

      for (const next of accessible) {
        remaining.add(next);
      }
    }
    ++mins;
  }

  return mins;
});
