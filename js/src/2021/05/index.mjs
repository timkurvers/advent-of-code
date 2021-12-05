/* eslint-disable no-nested-ternary */

import { Grid, cast, solution } from '../../utils';

const LINE_MATCHER = /(-?\d+),(-?\d+) -> (-?\d+),(-?\d+)/;

const parse = (input, { onlyAdjacent = false } = true) => {
  const grid = new Grid();
  const lines = input.trim().split('\n');
  for (const line of lines) {
    const match = line.match(LINE_MATCHER);
    const [x1, y1, x2, y2] = [
      cast(match[1]), cast(match[2]),
      cast(match[3]), cast(match[4]),
    ];

    const dx = x1 < x2 ? 1 : (x1 > x2 ? -1 : 0);
    const dy = y1 < y2 ? 1 : (y1 > y2 ? -1 : 0);

    const isAdjacent = dx === 0 || dy === 0;
    if (onlyAdjacent && !isAdjacent) {
      continue;
    }

    const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    for (let i = 0, x = x1, y = y1; i <= length; i++, x += dx, y += dy) {
      grid.set(x, y, (grid.get(x, y) || 0) + 1);
    }
  }
  return grid;
};

export const partOne = solution((input) => {
  const grid = parse(input, { onlyAdjacent: true });
  return grid.filter((point) => point.value >= 2).length;
});

export const partTwo = solution((input) => {
  const grid = parse(input);
  return grid.filter((point) => point.value >= 2).length;
});
