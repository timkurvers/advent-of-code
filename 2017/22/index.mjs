import {
  Grid,
  Orientation,
  Rotation,
  dx,
  dy,
  solution,
} from '../../utils';

const State = {
  CLEAN: '.',
  INFECTED: '#',
  WEAKENED: 'W',
  FLAGGED: 'F',
};

const v1 = {
  [State.CLEAN]: {
    mutation: State.INFECTED,
    rotation: Rotation.TURN_LEFT,
  },
  [State.INFECTED]: {
    mutation: State.CLEAN,
    rotation: Rotation.TURN_RIGHT,
  },
};

const v2 = {
  [State.CLEAN]: {
    mutation: State.WEAKENED,
    rotation: Rotation.TURN_LEFT,
  },
  [State.WEAKENED]: {
    mutation: State.INFECTED,
    rotation: Rotation.NONE,
  },
  [State.INFECTED]: {
    mutation: State.FLAGGED,
    rotation: Rotation.TURN_RIGHT,
  },
  [State.FLAGGED]: {
    mutation: State.CLEAN,
    rotation: Rotation.TURN_AROUND,
  },
};

const infect = (grid, { bursts = 1, version = v1 } = {}) => {
  const start = grid.center;
  const current = start;

  let infections = 0;
  let orientation = Orientation.UP;
  for (let b = 0; b < bursts; ++b) {
    const char = grid.get(current.x, current.y) || State.CLEAN;

    const { rotation, mutation } = version[char];
    orientation += rotation;
    grid.set(current.x, current.y, mutation);

    if (mutation === State.INFECTED) {
      ++infections;
    }

    current.x += dx(orientation);
    current.y += dy(orientation);
  }

  return infections;
};

export const partOne = solution.inefficient((input) => {
  const grid = Grid.from(input);
  return infect(grid, { bursts: 10000 });
});

export const partTwo = solution.inefficient((input) => {
  const grid = Grid.from(input);
  return infect(grid, { bursts: 10000000, version: v2 });
});
