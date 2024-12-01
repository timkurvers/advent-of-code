import { Grid, solution } from '../../utils/index.js';

const Type = {
  EMPTY: '.',
  EAST: '>',
  SOUTH: 'v',
};

const parse = (input) => Grid.from(input);

const simulate = (grid) => {
  let current = grid;

  let changed;
  let step = 0;
  do {
    changed = false;

    const tmp = new Grid();
    for (const point of current) {
      if (tmp.getPoint(point.x, point.y)) {
        continue;
      }
      if (point.value === Type.EAST) {
        const target = point.right ?? current.getPoint(current.minX, point.y);
        if (target.value === Type.EMPTY) {
          tmp.set(point.x, point.y, Type.EMPTY);
          tmp.set(target.x, target.y, Type.EAST);
          changed = true;
          continue;
        }
      }
      tmp.set(point.x, point.y, point.value);
    }

    const next = new Grid();
    for (const point of tmp) {
      if (next.getPoint(point.x, point.y)) {
        continue;
      }
      if (point.value === Type.SOUTH) {
        const target = point.down ?? tmp.getPoint(point.x, tmp.minY);
        if (target.value === Type.EMPTY) {
          next.set(point.x, point.y, Type.EMPTY);
          next.set(target.x, target.y, Type.SOUTH);
          changed = true;
          continue;
        }
      }
      next.set(point.x, point.y, point.value);
    }

    current = next;

    ++step;
  } while (changed);
  return step;
};

export const finalPart = solution.inefficient((input) => {
  const grid = parse(input);
  return simulate(grid);
});
