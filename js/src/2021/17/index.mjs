/* eslint-disable no-param-reassign */

import { range, reduceMaxBy, solution } from '../../utils';

const parse = (input) => {
  const [x1, x2, y1, y2] = input.trim().match(/-?\d+/g).map(Number);
  return {
    x1, x2, y1, y2,
  };
};

const lob = (sdx, sdy, target) => {
  let dx = sdx;
  let dy = sdy;
  let x = 0;
  let y = 0;
  let height = -Infinity;

  // Brute-force all the things!
  let step = 4000;
  while (step) {
    if (y > height) {
      height = y;
    }
    if (x >= target.x1 && x <= target.x2 && y >= target.y1 && y <= target.y2) {
      return { sdx, sdy, height };
    }
    x += dx;
    y += dy;
    dy -= 1;
    dx += -Math.sign(dx);
    --step;
  }
  return null;
};

export const partOne = solution.inefficient((input) => {
  const target = parse(input);

  const candidates = [];
  for (const dx of range({ length: 500 })) {
    for (const dy of range({ length: 500 })) {
      if (dx === 0 || dy === 0) {
        continue;
      }
      const result = lob(dx, dy, target);
      if (result) {
        candidates.push(result);
      }
    }
  }
  return reduceMaxBy(candidates, 'height').height;
});

export const partTwo = solution.inefficient((input) => {
  const target = parse(input);

  const candidates = [];
  for (const dx of range({ start: -400, end: 400 })) {
    for (const dy of range({ start: -400, end: 400 })) {
      const result = lob(dx, dy, target);
      if (result) {
        candidates.push(result);
      }
    }
  }
  return candidates.length;
});
