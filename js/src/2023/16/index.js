/* eslint-disable max-len, no-cond-assign, no-shadow, prefer-const */

import { Grid, Orientation, Rotation, dx, dy, isHorizontalOrientation, isVerticalOrientation, solution } from '../../utils/index.js';

const parse = (input) => Grid.from(input.trim());

const energize = (grid, start, orientation = Orientation.RIGHT) => {
  const beams = [{ current: start, orientation }];

  let beam;
  while (beam = beams.shift()) {
    let { current, orientation } = beam;
    while (current) {
      current.energized = true;

      let next = null;
      if (
        (current.value === '|' && isHorizontalOrientation(orientation))
        || (current.value === '-' && isVerticalOrientation(orientation))
      ) {
        // Prevent splitting ad infinitum
        if (current.split) break;
        current.split = true;

        orientation += Rotation.TURN_LEFT;
        next = grid.getPoint(current.x + dx(orientation), current.y + dy(orientation));
        beams.push({ current: next, orientation });

        orientation += Rotation.TURN_AROUND;
        next = grid.getPoint(current.x + dx(orientation), current.y + dy(orientation));
        beams.push({ current: next, orientation });
        break;
      }

      if (current.value === '/') {
        orientation += isHorizontalOrientation(orientation) ? Rotation.TURN_LEFT : Rotation.TURN_RIGHT;
      } else if (current.value === '\\') {
        orientation += isHorizontalOrientation(orientation) ? Rotation.TURN_RIGHT : Rotation.TURN_LEFT;
      }
      next = grid.getPoint(current.x + dx(orientation), current.y + dy(orientation));
      current = next;
    }
  }

  return grid.filter((point) => point.energized).length;
};

const reset = (grid) => {
  for (const point of grid) {
    point.energized = false;
    point.split = false;
  }
};

export const partOne = solution((input) => {
  const grid = parse(input);
  const start = grid.getPoint(0, 0);
  return energize(grid, start);
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  const { minX, maxX, minY, maxY } = grid;

  const candidates = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const start = grid.getPoint(x, y);
      if (x === minX) {
        candidates.push({ start, orientation: Orientation.RIGHT });
      }
      if (x === maxX) {
        candidates.push({ start, orientation: Orientation.LEFT });
      }
      if (y === minY) {
        candidates.push({ start, orientation: Orientation.DOWN });
      }
      if (y === maxY) {
        candidates.push({ start, orientation: Orientation.UP });
      }
    }
  }

  return candidates.reduce((most, candidate) => {
    const count = energize(grid, candidate.start, candidate.orientation);
    reset(grid);
    return count > most ? count : most;
  }, -Infinity);
});
