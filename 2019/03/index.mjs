import { day } from '..';
import {
  Grid,
  Orientation,
  dx,
  dy,
  reduceMinBy,
  sum,
} from '../../utils';

import examples from './input/examples';
import puzzleInput from './input';

const orientations = {
  U: Orientation.UP,
  D: Orientation.DOWN,
  L: Orientation.LEFT,
  R: Orientation.RIGHT,
};

const INSTRUCTIONS_MATCHER = /(\w)(\d+),?/g;

const parse = (input) => {
  const wires = input.split('\n');
  return wires.map((line) => {
    const instructions = [];
    for (const [, direction, distance] of line.matchAll(INSTRUCTIONS_MATCHER)) {
      instructions.push({ direction, distance: +distance });
    }
    return { instructions };
  });
};

const trace = (wires) => {
  const grid = new Grid();
  const overlaps = [];
  const numWires = wires.length;
  for (const wire of wires) {
    let steps = 0;
    let x = 0;
    let y = 0;
    let orientation = null;

    for (const { direction, distance } of wire.instructions) {
      orientation = orientations[direction];

      const target = steps + distance;
      for (; steps < target; ++steps) {
        x += dx(orientation);
        y += dy(orientation);

        let seen = grid.get(x, y);
        if (!seen) {
          seen = new Map();
          grid.set(x, y, seen);
        }

        // Wire has not been here before
        if (!seen.has(wire)) {
          seen.set(wire, steps + 1);
        }

        // All wires overlap at this point
        if (seen.size === numWires) {
          const point = grid.getPoint(x, y);
          overlaps.push({
            point,
            distance: point.distanceTo(0, 0),
            steps: sum(Array.from(seen.values())),
          });
        }
      }
    }
  }
  return { grid, overlaps };
};

day(3).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const wires = parse(input);
  const { overlaps } = trace(wires);
  return reduceMinBy(overlaps, 'distance').distance;
});

day(3).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const wires = parse(input);
  const { overlaps } = trace(wires);
  return reduceMinBy(overlaps, 'steps').steps;
});
