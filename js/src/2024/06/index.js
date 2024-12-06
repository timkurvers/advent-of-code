import { Grid, Orientation, Rotation, solution, dx, dy, normalizeOrientation } from '../../utils/index.js';

const GUARD = '^';
const OBSTACLE = '#';

const parse = (input) => {
  const grid = Grid.from(input);
  const start = grid.find((point) => point.value === GUARD);
  return { grid, start };
};

const explore = (grid, start) => {
  let orientation = Orientation.UP;

  // Holds points visited by the guard
  const visited = new Set();

  // Holds points the guard faced (in front)
  const faced = new Set();

  // Used to track whether the guard patrols in a loop
  const cyclic = new Set();
  const hash = (point, direction) => `${point.x}:${point.y}:${direction}`;

  let current = start;
  let isCyclic = false;
  while (current) {
    const entry = hash(current, orientation);
    if (cyclic.has(entry)) {
      isCyclic = true;
      break;
    }
    cyclic.add(entry);
    visited.add(current);

    const next = grid.getPoint(current.x + dx(orientation), current.y + dy(orientation));
    if (next) {
      faced.add(next);
    }
    if (next?.value === OBSTACLE) {
      orientation = normalizeOrientation(orientation + Rotation.TURN_RIGHT);
    } else {
      current = next;
    }
  }
  return { visited: Array.from(visited), faced, isCyclic };
};

export const partOne = solution((input) => {
  const { grid, start } = parse(input);
  return explore(grid, start).visited.length;
});

export const partTwo = solution.inefficient((input) => {
  const { grid, start } = parse(input);

  const initial = explore(grid, start);

  let count = 0;
  for (const candidate of initial.faced) {
    const original = candidate.value;
    candidate.value = OBSTACLE;

    const result = explore(grid, start);
    if (result.isCyclic) {
      count++;
    }

    candidate.value = original;
  }
  return count;
});
