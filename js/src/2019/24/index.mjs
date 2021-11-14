import {
  Grid, GridND, solution, sum,
} from '../../utils';

import RecursiveGridPoint from './RecursiveGridPoint';

const GRID_SIZE = 5;
const CENTER = GRID_SIZE / 2 | 0;

const Type = {
  BUG: '#',
  EMPTY: '.',
};

const isBug = (point) => point.value === Type.BUG;

const rate = (grid) => (
  sum(grid.map(({ x, y, value }) => (
    value === Type.BUG ? 2 ** (y * GRID_SIZE + x) : 0
  )))
);

const step = (grid) => {
  const recursive = grid instanceof GridND;
  const next = recursive ? (
    new GridND(grid.dimensions, { pointClass: grid.pointClass })
  ) : new Grid();

  for (const point of grid) {
    let { value } = point;
    const { adjacentNeighbors } = point;

    const adjacentBugs = adjacentNeighbors.filter(isBug).length;
    if (value === Type.BUG && adjacentBugs !== 1) {
      value = Type.EMPTY;
    } else if (value === Type.EMPTY && (adjacentBugs === 1 || adjacentBugs === 2)) {
      value = Type.BUG;
    }
    if (recursive) {
      next.set(point.position, value);
    } else {
      next.set(point.x, point.y, value);
    }
  }
  return next;
};

export const partOne = solution(async (input) => {
  const start = Grid.from(input);

  const seen = new Set();

  let current = start;
  while (true) {
    const snapshot = current.toString();
    if (seen.has(snapshot)) {
      return rate(current);
    }
    seen.add(snapshot);
    current = step(current);
  }
});

export const partTwo = solution.inefficient(async (input, { minutes = 200 }) => {
  const start = GridND.from(input, ['x', 'y', 'z'], {
    pointClass: RecursiveGridPoint,
  });
  start.remove([CENTER, CENTER, 0]);

  // Preparing depth levels upfront, ensures that neighbors discovered while
  // iterating are properly propogated to the next state
  const depth = minutes / 2 | 0;
  for (let z = -depth; z <= depth; ++z) {
    if (z === 0) continue;
    for (let y = 0; y < GRID_SIZE; ++y) {
      for (let x = 0; x < GRID_SIZE; ++x) {
        if (x === CENTER && y === CENTER) continue;
        start.set([x, y, z], '.');
      }
    }
  }

  let current = start;
  for (let minute = 1; minute <= minutes; ++minute) {
    current = step(current);
  }
  return current.filter(isBug).length;
});
