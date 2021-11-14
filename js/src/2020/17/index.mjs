import { GridND, solution } from '../../utils';

const State = {
  ACTIVE: '#',
  INACTIVE: '.',
};

const isActive = (point) => point.value === State.ACTIVE;

// Executes Conway Cube algorithm on given start grid
const execute = (start, cycles) => {
  // Pads the grid to ensure there is room for at least given amount of cycles
  start.pad(cycles, State.INACTIVE);

  let current = start;
  for (let cycle = 1; cycle <= cycles; ++cycle) {
    const next = new GridND(current.dimensions);
    for (const point of current) {
      let { value } = point;
      const { position } = point;

      // Number of activated neighbors (out of 26 or 80 candidates)
      const activated = point.neighbors.filter(isActive).length;

      if (isActive(point) && (activated < 2 || activated > 3)) {
        value = State.INACTIVE;
      }
      if (!isActive(point) && activated === 3) {
        value = State.ACTIVE;
      }
      next.set(position, value);
    }
    current = next;
  }
  return current;
};

export const partOne = solution((input, { cycles = 6 }) => {
  const dimensions = ['x', 'y', 'z'];
  const grid = GridND.from(input, dimensions);
  return execute(grid, cycles).filter(isActive).length;
});

export const partTwo = solution.inefficient((input, { cycles = 6 }) => {
  const dimensions = ['x', 'y', 'z', 'w'];
  const grid = GridND.from(input, dimensions);
  return execute(grid, cycles).filter(isActive).length;
});
