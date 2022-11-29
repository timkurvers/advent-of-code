/* eslint-disable key-spacing, no-multi-spaces */

import { Grid, solution } from '../../utils';

const Type = {
  EMPTY: 'L',
  FLOOR: '.',
  OCCUPIED: '#',
};

const RayDirections = [
  { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
  { dx: -1, dy:  0 },                    { dx: 1, dy:  0 },
  { dx: -1, dy:  1 }, { dx: 0, dy:  1 }, { dx: 1, dy:  1 },
];

// Whether given point holds an occupied seat
const isOccupied = (point) => point.value === Type.OCCUPIED;

// Finds the first seats seen (if any) from given point in all eight directions
const seatsSeenBy = (point) => RayDirections.map(({ dx, dy }) => {
  let current = point;
  do {
    current = point.grid.getPoint(current.x + dx, current.y + dy);
  } while (current && current.value === Type.FLOOR);
  return current;
}).filter(Boolean);

// Processes the seating model exactly once, returning a new grid if changes were
// made, if not, the original grid is returned
const step = (grid, model) => {
  let changed = false;
  const next = new Grid();
  for (const point of grid) {
    const { x, y } = point;
    let { value } = point;
    let occupied;
    let prerequisite;
    if (model === 'simple') {
      occupied = point.neighbors.filter(isOccupied).length;
      prerequisite = 4;
    } else {
      occupied = seatsSeenBy(point).filter(isOccupied).length;
      prerequisite = 5;
    }
    if (value === Type.EMPTY && occupied === 0) {
      value = Type.OCCUPIED;
      changed = true;
    }
    if (value === Type.OCCUPIED && occupied >= prerequisite) {
      value = Type.EMPTY;
      changed = true;
    }
    next.set(x, y, value);
  }
  return changed ? next : grid;
};

// Runs the full seating model, halting as soon as no changes are made
const run = (grid, model) => {
  let current = grid;
  while (true) {
    const next = step(current, model);
    if (current === next) {
      break;
    }
    current = next;
  }
  return current;
};

export const partOne = solution.inefficient((input) => {
  const grid = Grid.from(input);
  return run(grid, 'simple').filter(isOccupied).length;
});

export const partTwo = solution.inefficient((input) => {
  const grid = Grid.from(input);
  return run(grid, 'complex').filter(isOccupied).length;
});
