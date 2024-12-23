/* eslint-disable no-cond-assign */

import { Grid, floodfill, solution, sum } from '../../utils/index.js';

const parse = (input) => Grid.from(input.trim(), { cast: Number });

export const partOne = solution((input) => {
  const grid = parse(input);
  return sum(
    grid.map((point) => {
      const { value } = point;
      const isHigherLevel = (neighbor) => neighbor.value > value;
      if (point.adjacentNeighbors.every(isHigherLevel)) {
        return 1 + value;
      }
      return 0;
    }),
  );
});

export const partTwo = solution((input) => {
  const grid = parse(input);

  const basins = [];

  const visited = new Set();
  const isBasinPoint = (point) => point.value !== 9;
  const isUnprocessed = (point) => isBasinPoint(point) && !visited.has(point);

  let current = null;
  while ((current = grid.find(isUnprocessed))) {
    const { visited: basin } = floodfill(current, null, {
      neighborsFor: (point) => point.adjacentNeighbors.filter(isBasinPoint),
    });
    for (const point of basin) {
      visited.add(point);
    }
    basins.push(basin);
  }

  const top3 = basins.sort((a, b) => b.size - a.size).slice(0, 3);
  return top3.reduce((acc, basin) => acc * basin.size, 1);
});
