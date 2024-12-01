import {
  Grid, multiply, solution, wrap,
} from '../../utils/index.js';

const isTree = (value) => value === '#';

const traverse = (grid, dx, dy) => {
  let trees = 0;
  let x = 0;
  let y = 0;

  const { width, maxY } = grid;
  while (y <= maxY) {
    const value = grid.get(x, y);
    if (isTree(value)) {
      ++trees;
    }
    x = wrap(x + dx, width);
    y += dy;
  }
  return trees;
};

export const partOne = solution((input) => {
  const grid = Grid.from(input);
  const dx = 3;
  const dy = 1;
  return traverse(grid, dx, dy);
});

export const partTwo = solution((input) => {
  const grid = Grid.from(input);
  const slopes = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ];
  return multiply(slopes.map(({ dx, dy }) => traverse(grid, dx, dy)));
});
