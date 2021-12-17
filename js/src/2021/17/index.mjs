/* eslint-disable no-param-reassign */

import { range, reduceMaxBy, solution } from '../../utils';

const parse = (input) => {
  const [x1, x2, y1, y2] = input.trim().match(/-?\d+/g).map(Number);
  return {
    x1, x2, y1, y2,
  };
};

const launch = (sdx, sdy, target) => {
  const {
    x1, x2, y1, y2,
  } = target;

  let dx = sdx;
  let dy = sdy;
  let x = 0;
  let y = 0;
  let height = -Infinity;

  // Brute-force all the things!
  while (true) {
    if (y > height) {
      height = y;
    }
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return { sdx, sdy, height };
    }
    x += dx;
    y += dy;
    dy -= 1;
    dx += -Math.sign(dx);

    if (
      (y < y1 && dy < 0) // Will never get in Y-range
      || (x < x1 && dx < 0) // Will never get in X-range
      || (dx === 0 && (x < x1 || x > x2)) // Yeeting straight up into space
    ) {
      break;
    }
  }
  return null;
};

const bruteforce = (target, start = -400, end = 400) => {
  const candidates = [];
  for (const dx of range({ start, end })) {
    for (const dy of range({ start, end })) {
      const result = launch(dx, dy, target);
      if (result) {
        candidates.push(result);
      }
    }
  }
  return candidates;
};

export const partOne = solution((input) => {
  const target = parse(input);
  const candidates = bruteforce(target);
  return reduceMaxBy(candidates, 'height').height;
});

export const partTwo = solution((input) => {
  const target = parse(input);
  const candidates = bruteforce(target);
  return candidates.length;
});
