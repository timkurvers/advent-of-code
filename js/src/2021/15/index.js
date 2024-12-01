import { Grid, astar, solution } from '../../utils/index.js';

const parse = (input) => {
  const grid = Grid.from(input, { cast: Number });
  return grid;
};

export const partOne = solution((input) => {
  const grid = parse(input);

  const start = grid.getPoint(0, 0);
  const goal = grid.getPoint(grid.maxX, grid.maxY);

  const result = astar(start, goal, {
    neighborsFor: (point) => point.adjacentNeighbors,
    cost: (_current, next) => next.value,
  });
  return result.score;
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  const { width, height } = grid;

  for (const point of grid.points) {
    const { x, y } = point;
    let base = point.value;
    for (let ytile = 0; ytile < 5; ++ytile) {
      if (ytile !== 0) {
        ++base;
        if (base > 9) {
          base = 1;
        }
      }
      let value = base;
      for (let xtile = 0; xtile < 5; ++xtile) {
        if (xtile !== 0) {
          ++value;
          if (value > 9) {
            value = 1;
          }
        }
        grid.set(xtile * width + x, ytile * height + y, value);
      }
    }
  }

  const start = grid.getPoint(0, 0);
  const goal = grid.getPoint(grid.maxX, grid.maxY);

  const result = astar(start, goal, {
    neighborsFor: (point) => point.adjacentNeighbors,
    cost: (_current, next) => next.value,
  });
  return result.score;
});
