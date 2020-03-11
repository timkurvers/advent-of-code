import { Grid, solution, sum } from '../../utils';

const spiral = (until) => {
  const grid = new Grid();

  const create = (nr, x, y) => {
    const point = grid.set(x, y);
    point.nr = nr;
    point.distance = Math.abs(x) + Math.abs(y);
    point.value = nr === 1 ? nr : sum(point.neighbors.map((neighbor) => neighbor.value));
    return point;
  };

  let size = 1;
  let target = size * size;
  let current = create(1, 0, 0);
  let dx;
  let dy;

  let i = 2;
  while (!until(current)) {
    if (i > target) {
      size += 2;
      target = size * size;
      dx = 1;
      dy = 0;
    }
    current = create(i, current.x + dx, current.y + dy);
    const edge = Math.floor(size / 2);
    if (current.x === edge) {
      dx = 0;
      dy = -1;
    }
    if (current.y === -edge) {
      dx = -1;
      dy = 0;
    }
    if (current.x === -edge) {
      dx = 0;
      dy = 1;
    }
    if (current.y === edge) {
      dx = 1;
      dy = 0;
    }
    ++i;
  }

  return {
    square: current,
  };
};

export const partOne = solution((input) => {
  const target = +input;
  const { square } = spiral((until) => until.nr === target);
  return square.distance;
});

export const partTwo = solution((input) => {
  const target = +input;
  const { square } = spiral((until) => until.value > target);
  return square.value;
});
