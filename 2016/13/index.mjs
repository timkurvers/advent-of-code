import { astar, solution } from '../../utils';

import Maze, { Type } from './Maze';

const traverse = (start, goal) => (
  astar(start, goal, {
    neighborsFor: point => point.adjacentNeighbors.filter(neighbor => (
      neighbor.value === Type.OPEN_SPACE
    )),
  })
);

export const partOne = solution((input, isExample) => {
  const maze = new Maze(input);
  const start = maze.getPoint(1, 1);
  const goal = isExample ? maze.getPoint(7, 4) : maze.getPoint(31, 39);
  return traverse(start, goal).score;
});

export const partTwo = solution();
