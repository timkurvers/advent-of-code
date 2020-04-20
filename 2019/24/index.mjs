import { Grid, solution, sum } from '../../utils';

const GRID_SIZE = 5;

const Type = {
  BUG: '#',
  EMPTY: '.',
};

const rate = (grid) => (
  sum(grid.map(({ x, y, value }) => (
    value === Type.BUG ? 2 ** (y * GRID_SIZE + x) : 0
  )))
);

const step = (grid) => {
  const next = new Grid();

  for (const point of grid) {
    const { x, y } = point;
    let { value } = point;

    const adjacentBugs = point.adjacentNeighbors.filter((adjacent) => (
      adjacent.value === Type.BUG
    )).length;

    if (value === Type.BUG && adjacentBugs !== 1) {
      value = Type.EMPTY;
    } else if (value === Type.EMPTY && (adjacentBugs === 1 || adjacentBugs === 2)) {
      value = Type.BUG;
    }
    next.set(x, y, value);
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
