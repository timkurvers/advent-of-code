import { astar, solution } from '../../utils';

import Maze, { Type } from './Maze';

const traverse = (start, goal) => (
  astar(start, goal, {
    neighborsFor: point => point.adjacentNeighbors.filter(neighbor => (
      neighbor.value === Type.OPEN_SPACE
    )),
  })
);

export const partOne = solution((input, { goalX = 31, goalY = 39 }) => {
  const maze = new Maze(input);
  const start = maze.getPoint(1, 1);
  const goal = maze.getPoint(goalX, goalY);
  return traverse(start, goal).score;
});

export const partTwo = solution();
