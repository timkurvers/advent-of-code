import { day } from '..';
import { astar } from '../../utils';

import Maze, { Type } from './Maze';
import examples from './input/examples';
import puzzleInput from './input';

const traverse = (start, goal) => (
  astar(start, goal, {
    neighborsFor: point => point.adjacentNeighbors.filter(neighbor => (
      neighbor.value === Type.OPEN_SPACE
    )),
  })
);

day(13).part(1).test(examples).feed(puzzleInput).solution((input, isExample) => {
  const maze = new Maze(input);
  const start = maze.getPoint(1, 1);
  const goal = isExample ? maze.getPoint(7, 4) : maze.getPoint(31, 39);
  return traverse(start, goal).score;
});

// day(13).part(2).test(examples).feed(null).solution((input) => {
// });
