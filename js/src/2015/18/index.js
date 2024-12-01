import { Grid, solution } from '../../utils/index.js';

const State = {
  ON: '#',
  OFF: '.',
};

const step = (grid, { isStuck = () => false } = {}) => {
  const next = new Grid();

  for (const point of grid) {
    const { x, y } = point;
    let { value } = point;

    if (!isStuck(point)) {
      const litNeighbors = point.neighbors.filter((neighbor) => neighbor.value === State.ON).length;

      if (value === State.ON && litNeighbors !== 2 && litNeighbors !== 3) {
        value = State.OFF;
      } else if (value === State.OFF && litNeighbors === 3) {
        value = State.ON;
      }
    }

    next.set(x, y, value);
  }

  return next;
};

export const partOne = solution.inefficient((input, { steps = 100 } = {}) => {
  const grid = Grid.from(input);
  let current = grid;
  for (let s = 0; s < steps; ++s) {
    current = step(current);
  }
  return current.filter((point) => point.value === State.ON).length;
});

export const partTwo = solution.inefficient((input, { steps = 100 } = {}) => {
  const grid = Grid.from(input);
  const { minX, maxX, minY, maxY } = grid;

  grid.set(minX, minY, State.ON);
  grid.set(minX, maxY, State.ON);
  grid.set(maxX, minY, State.ON);
  grid.set(maxX, maxY, State.ON);

  const isStuck = (point) =>
    (point.x === minX && point.y === minY) ||
    (point.x === minX && point.y === maxY) ||
    (point.x === maxX && point.y === minY) ||
    (point.x === maxX && point.y === maxY);

  let current = grid;
  for (let s = 0; s < steps; ++s) {
    current = step(current, { isStuck });
  }
  return current.filter((point) => point.value === State.ON).length;
});
