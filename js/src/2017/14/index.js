import { Grid, solution } from '../../utils/index.js';
import { knothash } from '../10/knothash.js';

import Region from './Region.js';

const keyToGrid = (key, size = 128) => {
  const grid = new Grid();
  for (let y = 0; y < size; ++y) {
    const hash = knothash(`${key}-${y}`);
    const bits = hash.flatMap((byte) => byte.toString(2).padStart(8, '0').split('').map(Number));

    for (let x = 0; x < size; ++x) {
      grid.set(x, y, !!bits[x]);
    }
  }
  return grid;
};

export const partOne = solution.inefficient((input) => {
  const grid = keyToGrid(input);
  return grid.filter((point) => point.value).length;
});

export const partTwo = solution.inefficient((input) => {
  const regions = new Set();
  const grid = keyToGrid(input);

  const merge = (a, b) => {
    for (const point of a.points) {
      point.region = b;
    }
    regions.delete(a);
  };

  for (const point of grid) {
    if (!point.value) {
      continue;
    }

    const candidate = point.adjacentNeighbors.find((neighbor) => neighbor.region);
    let region = candidate && candidate.region;
    if (!region) {
      region = new Region(grid, regions.size + 1);
      regions.add(region);
    }
    point.region = region;

    const { left, up } = point;
    if (up && up.region && up.region !== region) {
      merge(point.up.region, region);
    }
    if (left && left.region && left.region !== region) {
      merge(point.left.region, region);
    }
  }

  return regions.size;
});
