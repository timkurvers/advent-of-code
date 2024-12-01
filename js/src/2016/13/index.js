import { astar, solution } from '../../utils/index.js';

import Maze, { Type } from './Maze.js';

const traverse = (start, goal) =>
  astar(start, goal, {
    neighborsFor: (point) => point.adjacentNeighbors.filter((neighbor) => neighbor.value === Type.OPEN_SPACE),
  });

export const partOne = solution((input, { goalX = 31, goalY = 39 }) => {
  const maze = new Maze(input);
  const start = maze.getPoint(1, 1);
  const goal = maze.getPoint(goalX, goalY);
  return traverse(start, goal).score;
});

export const partTwo = solution.inefficient((input) => {
  const steps = 50;

  const maze = new Maze(input);
  const start = maze.getPoint(1, 1);

  let destinations = 0;
  for (let y = 0; y <= steps + start.y; ++y) {
    for (let x = 0; x <= steps + start.x; ++x) {
      const goal = maze.getPoint(x, y);
      const result = traverse(start, goal);
      if (result && result.score <= steps) {
        ++destinations;
      }
    }
  }
  return destinations;
});
