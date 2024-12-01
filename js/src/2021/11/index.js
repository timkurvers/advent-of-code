/* eslint-disable no-cond-assign, no-param-reassign */

import { Grid, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input, { cast: Number });

const round = (grid) => {
  const flashed = new Set();
  const frontier = [];

  const increase = (point) => {
    if (flashed.has(point)) {
      return;
    }
    point.value += 1;
    if (point.value > 9) {
      point.value = 0;
      frontier.push(...point.neighbors);
      flashed.add(point);
    }
  };

  for (const point of grid.points) {
    increase(point);
  }

  let current = null;
  while ((current = frontier.pop())) {
    increase(current);
  }

  return flashed.size;
};

export const partOne = solution((input, { steps = 100 } = {}) => {
  const grid = parse(input);

  let flashes = 0;
  for (let step = 1; step <= steps; ++step) {
    flashes += round(grid);
  }
  return flashes;
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  const { length } = grid.points;

  for (let step = 1; ; ++step) {
    const flashes = round(grid);
    if (flashes === length) {
      return step;
    }
  }
});
