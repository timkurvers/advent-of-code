import { Grid, cast, solution, sum } from '../../utils/index.js';

const START = 'S';
const SPLITTER = '^';
const EMPTY = '.';
const ZERO = 0;

// Walks grid and replaces relevant tiles with number of passthroughs
const analyze = (input) => {
  const grid = Grid.from(input.replaceAll(EMPTY, ZERO), { cast });

  const splits = new Set();

  for (const point of grid) {
    if (point.value === START) {
      point.value = 1;
    }

    if (point.up && point.up.value !== ZERO) {
      if (point.value === SPLITTER) {
        const { left, right } = point;
        left.value += point.up.value;
        right.value += point.up.value;
        splits.add(point);
      } else if (point.up.value !== SPLITTER) {
        point.value += point.up.value;
      }
    }
  }

  return { grid, splits };
};

export const partOne = solution((input) => {
  const { splits } = analyze(input);
  return splits.size;
});

export const partTwo = solution((input) => {
  const { grid } = analyze(input);
  const bottom = grid.row(grid.maxY);
  return sum(bottom);
});
