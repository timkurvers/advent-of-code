#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Nanobot from './Nanobot';
import examples from './input/examples';
import puzzleInput from './input';

day(23).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const nanobots = Nanobot.from(input);

  const strongest = nanobots.reduce((nanobot, next) => (
    nanobot.radius > next.radius ? nanobot : next
  ));
  return nanobots.filter(nanobot => strongest.inRange(nanobot)).length;
});

day(23).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const nanobots = Nanobot.from(input);

  const xs = nanobots.map(nanobot => nanobot.x);
  const ys = nanobots.map(nanobot => nanobot.y);
  const zs = nanobots.map(nanobot => nanobot.z);

  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);
  let minZ = Math.min(...zs);
  let maxZ = Math.max(...zs);

  const width = maxX - minX;
  const start = new Nanobot(0, 0, 0);

  // Based on: https://www.reddit.com/r/adventofcode/comments/a8sqov/help_day_23_part_2_any_provably_correct_fast/ece13bi/
  let divisor = 1;
  while (divisor < width) {
    divisor *= 2;
  }

  while (true) {
    let best = null;
    let max = -Infinity;

    for (let z = minZ; z <= maxZ; z += divisor) {
      for (let y = minY; y <= maxY; y += divisor) {
        for (let x = minX; x <= maxX; x += divisor) {
          const point = new Nanobot(x, y, z);
          const count = nanobots.filter(nanobot => nanobot.inRange(point)).length;

          if (count < max) {
            continue;
          }
          if (count === max && start.distanceTo(point) > start.distanceTo(best)) {
            continue;
          }

          best = point;
          max = count;
        }
      }
    }

    if (divisor === 1) {
      return start.distanceTo(best);
    }

    maxX = best.x + divisor;
    minX = best.x - divisor;
    maxY = best.y + divisor;
    minY = best.y - divisor;
    maxZ = best.z + divisor;
    minZ = best.z - divisor;
    divisor /= 2;
  }
});
