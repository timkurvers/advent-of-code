/* eslint-disable no-param-reassign */

import { Grid, combine, distance2D, solution } from '../../utils';

const parse = (input) => {
  const grid = Grid.from(input.trim());
  const galaxies = grid.filter((point) => point.value === '#');

  const isEmpty = (value) => value === '.';

  const expanses = { x: [], y: [] };
  for (let y = grid.minY; y <= grid.maxY; ++y) {
    if (grid.row(y).every(isEmpty)) {
      expanses.y.push(y);
    }
  }
  for (let x = grid.minX; x <= grid.maxX; ++x) {
    if (grid.column(x).every(isEmpty)) {
      expanses.x.push(x);
    }
  }

  return { expanses, galaxies };
};

const isBetween = (v, a, b) => (a < v && v < b) || (a > v && v > b);

const expansiveDistance2D = (a, b, expanses, extra = 1) => {
  let distance = distance2D(a.x, a.y, b.x, b.y);

  distance += expanses.x.reduce((acc, x) => {
    acc += isBetween(x, a.x, b.x) ? extra : 0;
    return acc;
  }, 0);

  distance += expanses.y.reduce((acc, y) => {
    acc += isBetween(y, a.y, b.y) ? extra : 0;
    return acc;
  }, 0);

  return distance;
};

export const partOne = solution((input) => {
  const { galaxies, expanses } = parse(input);

  let sum = 0;
  for (const [a, b] of combine(galaxies, { k: 2 })) {
    sum += expansiveDistance2D(a, b, expanses);
  }
  return sum;
});

export const partTwo = solution((input, { times = 1000000 }) => {
  const { galaxies, expanses } = parse(input);

  let sum = 0;
  for (const [a, b] of combine(galaxies, { k: 2 })) {
    sum += expansiveDistance2D(a, b, expanses, times - 1);
  }
  return sum;
});
