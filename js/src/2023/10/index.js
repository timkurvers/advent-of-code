/* eslint-disable consistent-return, quote-props */

import { Grid, Orientation, dx, dy, solution } from '../../utils/index.js';

const PIPES = {
  '|': {
    // vertical pipe connecting north and south.
    [Orientation.UP]: Orientation.UP,
    [Orientation.DOWN]: Orientation.DOWN,
  },
  '-': {
    // horizontal pipe connecting east and west.
    [Orientation.LEFT]: Orientation.LEFT,
    [Orientation.RIGHT]: Orientation.RIGHT,
  },
  L: {
    // 90-degree bend connecting north and east.
    [Orientation.DOWN]: Orientation.RIGHT,
    [Orientation.LEFT]: Orientation.UP,
  },
  J: {
    // 90-degree bend connecting north and west.
    [Orientation.DOWN]: Orientation.LEFT,
    [Orientation.RIGHT]: Orientation.UP,
  },
  7: {
    // 90-degree bend connecting south and west.
    [Orientation.UP]: Orientation.LEFT,
    [Orientation.RIGHT]: Orientation.DOWN,
  },
  F: {
    // 90-degree bend connecting south and east.
    [Orientation.UP]: Orientation.RIGHT,
    [Orientation.LEFT]: Orientation.DOWN,
  },
};

const parse = (input) => Grid.from(input.trim());

const traverse = (grid, start) => {
  // Does not matter which orientation to start with (as it is a loop)
  let orientation = Object.values(PIPES[start.value])[0];

  let current = start;
  const path = [];
  do {
    const next = grid.getPoint(current.x + dx(orientation), current.y + dy(orientation));
    const directions = PIPES[next?.value];
    if (!directions || !(orientation in directions)) {
      return null;
    }
    orientation = directions[orientation];
    path.push(next);
    current = next;
  } while (current !== start);
  return path;
};

const findLoop = (grid) => {
  const start = grid.find((point) => point.value === 'S');

  // What's that? Brute-force again? Yes.
  for (const variant of Object.keys(PIPES)) {
    start.value = variant;
    const path = traverse(grid, start);
    if (path) {
      return path;
    }
  }
};

export const partOne = solution((input) => {
  const grid = parse(input);
  const loop = findLoop(grid);
  return loop.length / 2;
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  const loop = findLoop(grid);

  let area = 0;

  // See: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
  let y = 0;
  let enclosed = false;
  let edge = null;
  for (const point of grid) {
    if (point.y > y) {
      enclosed = false;
      edge = null;
      y = point.y;
    }

    const onLoop = loop.includes(point);

    const { value } = point;
    if (onLoop && value !== '-') {
      // Sweet jesus, this took way too long to figure out :')

      // When dealing with a boxed edge: ┌─┐ or └─┘
      if ((edge === 'F' && value === '7') || (edge === 'L' && value === 'J')) {
        enclosed = !enclosed;
        edge = null;

        // When dealing with a bend: ┌─┘ or └─┐
      } else if ((edge === 'F' && value === 'J') || (edge === 'L' && value === '7')) {
        edge = null;

        // Mark as intersection for all other cases and handle edge entry: ┌─ or └─
      } else {
        enclosed = !enclosed;
        if (value === 'F' || value === 'L') {
          edge = value;
        }
      }
    }

    if (!onLoop && enclosed) {
      ++area;
    }
  }

  return area;
});
